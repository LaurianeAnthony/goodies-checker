import QrcodeDecoder from "../node_modules/qrcode-decoder/dist/index"
import React, { FC, useEffect, useState } from "react";

var qr = new QrcodeDecoder();


enum FacingMode {
  ENVIRONEMENT = 'environment',
  USER = 'user'
}

type Device = 'mobile' | 'desktop'

export const Camera: FC = () => {
  const [scanning, setScanning] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const [qrcode, setQrcode] = useState<string>()
  const [image, setImage] = useState<string>()
  const [device, setDevice] = useState<Device>('mobile')
  const [imageCapture, setImageCapture] = useState<ImageCapture | null>(null)
  // const [bitmap, setBitmap] = useState<ImageBitmap>()

  useEffect(() => {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      setDevice('mobile')
    } else {
      setDevice('desktop')
    }
  }, [])


  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: device === 'mobile' ? { exact: FacingMode.ENVIRONEMENT }: FacingMode.USER,
        }
      });

      const track = stream.getVideoTracks()[0]
      let imageCapture = new ImageCapture(track);
      setStream(stream)
      setImageCapture(imageCapture)
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
  }


  // useEffect(() => {
  //   if (stream) {
  //     setTrack(stream.getVideoTracks()[0])
  //     track && track.applyConstraints({
  //       facingMode: facingMode,
  //     })
  //   }
  // }, [facingMode, stream, track])

  // useEffect(() => {
  //   console.log('scanStart', scanStart)
  //   if (scanStart) {
  //     getStream()
  //   }
  //   else {
  //     stream && stream.getTracks().forEach(function (track) {
  //       track.stop();
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [scanStart])

  useEffect(() => {
    if (image) {
      qr.decodeFromImage(image).then((res) => {
        setQrcode(res.data)
        console.log("qrcode", res.data);
      }).catch(e => {setQrcode('Nothing found')});
    }
  }, [image])

  const startScanning = () => {
    setScanning(true)
    console.log('device',device)
    getStream()
    setImage('')
  }

  return <div>
    <button onClick={() => startScanning()}>Scan a QrCode</button>
    <p>{navigator.userAgent}</p>
    <p>{qrcode}</p>
    <canvas id="grabFrameCanvas"></canvas>
    <img src={image} width="200px" alt="" />
    {stream && scanning && <>
      {imageCapture && <button
        onClick={() => {
          imageCapture.grabFrame().then(bmp => {
            console.log(bmp)
            stream && stream.getTracks().forEach(function (track) {
              track.stop();
            });
            setScanning(false)
            
            const canvas = document.createElement('canvas');
            // resize it to the size of our ImageBitmap
            canvas.width = bmp.width;
            canvas.height = bmp.height;
            // get a bitmaprenderer context
            const ctx = canvas.getContext('bitmaprenderer');
            ctx && ctx.transferFromImageBitmap(bmp);
            // get it back as a Blob
            new Promise((res) => canvas.toBlob(res)).then((blob) => {
              console.log(blob); // Blob
              setImage(URL.createObjectURL(blob as Blob))
            } );


          }

          )


        }}>
        take photo
      </button>}
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