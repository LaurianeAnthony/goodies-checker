import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import QrcodeDecoder from "../../node_modules/qrcode-decoder/dist/index"
import { useAppContext } from "../AppProvider";
import { Alert } from "../components/Alert";
import { CameraGuide } from "../components/CameraGuide";
import { Typography } from "../components/Typography";
import { THEME } from "../constants/theme";
import { Device } from "../types";
import { getUserDevice } from "../utils/getUserDevice";
import { hexToRGB } from "../utils/ui/colorConverter";

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

  background-color: ${THEME.colors.content.main};
  
  display:flex;
  justify-content: center;
`

const StyledOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Scanning: FC = () => {
  const [device, setDevice] = useState<Device>("mobile")
  const [isStreamLoading, setIsStreamLoading] = useState(false)
  const [stream, setStream] = useState<MediaStream>()

  const [image, setImage] = useState<string>()
  const [ error, setError ] = useState<string | null>(null)
  const navigate= useNavigate()
  const {setBarcode, setStep} = useAppContext()
  
  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: device === "mobile" ? { exact: "environment" } : "user",
          // facingMode: device === "mobile" ? "user" : "user",
          // facingMode: device === "mobile" ? { exact: "environment" } : { exact: "environment" },
        }
      });
      setIsStreamLoading(false)
      setStream(stream)
    } catch (err) {
      setIsStreamLoading(false)
      setError((err as DOMException).message)
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
        console.log(res.data)
        if(res.data){
          setBarcode(res.data)
          navigate(`/user/${res.data}`)
          return setStep("RESULT")
        }
         
        getStream()

        return setError("Code not found")
      }).catch(e => {

        setError(e)
      });
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])


  if(isStreamLoading) return <p>Loading</p>
  
  return (
    <>
      {error && <Alert severity="error" text={error} />}
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
          >
            <StyledOverlay>
              <Typography variant="body" 
                color={THEME.colors.content.above.contrast} 
                backgroundColor={hexToRGB(THEME.colors.content.main, 0.5)}
                px="s"
                mb="s"
              >Appuyez sur l&apos;écran pour scanner</Typography>
              <CameraGuide />
            </StyledOverlay>
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
      </StyledCameraContainer></>
  )
}