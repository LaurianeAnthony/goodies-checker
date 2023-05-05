import React, { FC, useEffect, useState } from "react";
import styled from "styled-components"
import QrcodeDecoder from "../../node_modules/qrcode-decoder/dist/index"
import { useAppContext } from "../AppProvider";
import { COLORS } from "../constants";
import { Device } from "../types";
import { getUserDevice } from "../utils/getUserDevice";

var qr = new QrcodeDecoder();

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;

  background: none;
  border: none;

  position: relative;
`

const StyledCameraContainer = styled.div`
  width: 100%;
  height: 100vh;

  background-color: ${COLORS.content.default};
  
  display:flex;
  justify-content: center;
`

const StyledOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${COLORS.background.overlay};

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledQrCodeLimit = styled.div`
  border: 6px solid ${COLORS.content.default};
  height: 300px;
  width: 300px;
`

type CameraProps = {
  onError: (error: string) => void
}


export const Camera: FC<CameraProps> = ({ onError}) => {
  const [device, setDevice] = useState<Device>("mobile")
  const [isStreamLoading, setIsStreamLoading] = useState(false)
  const [stream, setStream] = useState<MediaStream>()

  const [image, setImage] = useState<string>()

  const {setBarcode, setStep} = useAppContext()
  
  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          // facingMode: device === "mobile" ? { exact: "environment" } : "user",
          facingMode: device === "mobile" ? "user": "user",
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
    getStream()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (image) {
      qr.decodeFromImage(image).then((res) => {
        if(res.data){
          setBarcode(res.data)
          return setStep("RESULT")
        }

        return onError("Code not found")
      }).catch(e => {
        onError(e)
      });
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])


  if(isStreamLoading) return <p>Loading</p>
  
  return (
    <StyledCameraContainer>
      {stream  &&
        <>
          <StyledButton
            onClick={() => {
              const track = stream.getVideoTracks()[0]
              const imageCapture = new ImageCapture(track);

              imageCapture.grabFrame().then(bmp => {
                stream && stream.getTracks().forEach(function (track) {
                  track.stop();
                });
                // setIsScanning(false)

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
          ><StyledOverlay><StyledQrCodeLimit /></StyledOverlay>
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
      }
    </StyledCameraContainer>
  )
}