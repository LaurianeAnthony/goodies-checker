import React, { FC, useEffect, useState } from "react";
import QrcodeDecoder from "../node_modules/qrcode-decoder/dist/index"

var qr = new QrcodeDecoder();

type Device = "mobile" | "desktop"

export const Camera: FC = () => {
  const [scanning, setScanning] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const [qrcode, setQrcode] = useState<string>()
  const [image, setImage] = useState<string>()
  const [device, setDevice] = useState<Device>("mobile")
  const [imageCapture, setImageCapture] = useState<ImageCapture | null>(null)

  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: device === "mobile" ? { exact: "environment" } : "user",
        }
      });
      setStream(stream)

      const track = stream.getVideoTracks()[0]
      let imageCapture = new ImageCapture(track);
      setImageCapture(imageCapture)
    } catch (err) {
      console.log(err)
      /* handle the error */
    }
  }

  useEffect(() => {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      setDevice("mobile")
    } else {
      setDevice("desktop")
    }
  }, [])

  useEffect(() => {
    if (image) {
      qr.decodeFromImage(image).then((res) => {
        setQrcode(res.data)
        console.log("qrcode", res.data);
      }).catch(e => {
        console.log(e)
        setQrcode("Nothing found")
      });
    }
  }, [image])

  const startScanning = () => {
    setScanning(true)
    setImage("")
    getStream()
  }

  return (<div>
    <button onClick={() => startScanning()}>Scan a QrCode</button>
    <p>{qrcode}</p>

    {stream && scanning && imageCapture && <>
      <button
        onClick={() => {
          imageCapture.grabFrame().then(bmp => {
            console.log(bmp)
            stream && stream.getTracks().forEach(function (track) {
              track.stop();
            });
            setScanning(false)

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
          }
          )
        }}>
        <video
          autoPlay
          width="100%"
          ref={(video) => {
            if (video) {
              video.srcObject = stream;
            }
          }}
        ><track kind="captions"/></video> </button>

    </>}
  </div>)
}