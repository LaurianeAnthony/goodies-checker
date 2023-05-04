import QrcodeDecoder from "../node_modules/qrcode-decoder/dist/index"
import React, { FC, useEffect, useState } from "react";

var qr = new QrcodeDecoder();


enum FacingMode {
  ENVIRONEMENT = 'environement',
  USER = 'user'
}

export const Camera: FC = () => {
  const [scanStart, setScanStart] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const [qrcode, setQrcode] = useState<string>()
  const [image, setImage] = useState<string>()
  const [facingMode, setFacingMode] = useState<FacingMode>(FacingMode.ENVIRONEMENT)
  const [track, setTrack] = useState<MediaStreamTrack | null>(null)

  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        facingMode: facingMode,
      } });
      setStream(stream)
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
  }

  useEffect(() =>{
    if(stream){
      setTrack(stream.getVideoTracks()[0])
      track && track.applyConstraints( {
        width: { ideal: 4096 },
        height: { ideal: 2160 },
        facingMode: facingMode,
      } )
    }
  }, [facingMode])


  useEffect(() => {
    console.log('scanStart', scanStart)
    if(scanStart){
      getStream()
    }
    else {
      stream && stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanStart])

useEffect(() => {
  console.log("ici")
  if(image){
    qr.decodeFromImage(image).then((res) => {
      setQrcode(res.data)
      console.log("qrcode", res.data);
    });
  }
}, [image])

const startScanning =() => {
  setScanStart(true)
  setImage('')
}

  return <div>
    <button onClick={() => startScanning()}>Scan a QrCode</button>
    <p>Test: {Object.values(track?.getConstraints() || {}).join(',')}</p>

  <button onClick={() => facingMode === FacingMode.ENVIRONEMENT ? setFacingMode(FacingMode.USER) : setFacingMode(FacingMode.ENVIRONEMENT)}>Switch to {facingMode === FacingMode.ENVIRONEMENT ? 'front camera' : 'back camera'}</button>
    <p>{qrcode}</p>
    {stream && scanStart && <>    
    <button 
      onClick={() => {
        const track = stream.getVideoTracks()[0]
        let imageCapture = new ImageCapture(track);
        imageCapture.takePhoto().then(blob => {
          setScanStart(false)
          setImage(URL.createObjectURL(blob))

        }
          
        )


      }}>
        take photo
      </button>
    <video
        autoPlay
        width="100%"
        ref={(video) => {
          if (video) {
            video.srcObject = stream;
          }
        }}
      />
      
      </>}
  </div>
}