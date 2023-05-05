import React, { FC, useEffect, useState } from "react";
import styled from "styled-components"
import QrcodeDecoder from "../../node_modules/qrcode-decoder/dist/index"
import { useAppContext } from "../AppProvider";
import { Device } from "../types";
import { getUserDevice } from "../utils/getUserDevice";

var qr = new QrcodeDecoder();

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
`

const StyledCameraContainer = styled.div`
  width: calc(100% - 40px);
  height: calc(50vh);
  margin: 20px;
  
  display:flex;
  justify-content: center;
`

type CameraProps = {
  onError: (error: string) => void
}


export const Camera: FC<CameraProps> = ({ onError}) => {
  const [device, setDevice] = useState<Device>("mobile")

  const [isScanning, setIsScanning] = useState(false)
  const [isStreamLoading, setIsStreamLoading] = useState(false)
  const [stream, setStream] = useState<MediaStream>()

  const [image, setImage] = useState<string>()

  const {setBarcode} = useAppContext()
  
  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: device === "mobile" ? { exact: "environment" } : "user",
        }
      });
      setIsStreamLoading(false)
      setStream(stream)
    } catch (err) {
      setIsStreamLoading(false)
      onError((err as DOMException).message)
    }
  }

  useEffect(() => {
    setDevice(getUserDevice(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (image) {
      qr.decodeFromImage(image).then((res) => {
        console.log(res.data)
        if(res.data){
          return setBarcode(res.data)
        }

        return onError("Code not found")
      }).catch(e => {
        console.log(e)
        onError(e)
      });
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const startScanning = () => {
    setImage("")
    setBarcode(null)

    setIsStreamLoading(true)
    setIsScanning(true)

    getStream()
  }

  if(isStreamLoading) return <p>Loading</p>
  
  return (
    <StyledCameraContainer>
      {stream && isScanning ? 
        <>
          <StyledButton
            onClick={() => {
              const track = stream.getVideoTracks()[0]
              const imageCapture = new ImageCapture(track);

              imageCapture.grabFrame().then(bmp => {
                console.log(bmp)
                stream && stream.getTracks().forEach(function (track) {
                  track.stop();
                });
                setIsScanning(false)

                const canvas = document.createElement("canvas");
                // resize it to the size of our ImageBitmap
                canvas.width = bmp.width;
                canvas.height = bmp.height;
                // get a bitmaprenderer context
                const ctx = canvas.getContext("bitmaprenderer");
                ctx && ctx.transferFromImageBitmap(bmp);
                // get it back as a Blob
                new Promise((res) => canvas.toBlob(res)).then((blob) => {
                  setImage(URL.createObjectURL(blob as Blob))
                });
              })
            }}
          >
            <video
              autoPlay
              width="100%"
              height="100%"
              ref={(video) => {
                if (video) {
                  video.srcObject = stream;
                }
              }}
            >
              <track kind="captions" />
            </video>
          </StyledButton>
        </>
        : 
        <StyledButton onClick={() => startScanning()}>Scan a QrCode</StyledButton>
      }
    </StyledCameraContainer>
  )
}