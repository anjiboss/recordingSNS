let btn = document.getElementById('btn')
let stopBtn = document.getElementById('stop')
let reqbtn = document.getElementById('req')
btn.onclick = () => {
  let chuck = []
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.start()
    mediaRecorder.addEventListener('dataavailable', (e) => {
      chuck.push(e.data)
    })
    mediaRecorder.addEventListener('stop', (e) => {
      console.log(chuck)
      let blob = new Blob(chuck)
      console.log(blob)
      let fd = new FormData()
      fd.append('upl', blob, 'blobb.mp3')
      console.log(fd)
      fetch('/upload', {
        method: 'post',
        body: fd,
      })
      let audioUrl = URL.createObjectURL(blob)
      audio = new Audio(audioUrl)
      audio.setAttribute('controls', 1)
      document.getElementById('container').appendChild(audio)
    })
  })
  stopBtn.onclick = function () {
    mediaRecorder.stop()
  }
}
reqbtn.onclick = async () => {
  const inp = document.getElementById('in')
  const res = await fetch(`/file/${inp.value}`)
  res.blob().then((blob) => {
    if (blob.type == 'audio/mpeg') {
      let audioUrl = URL.createObjectURL(blob)
      audio = new Audio(audioUrl)
      audio.setAttribute('controls', 1)
      document.getElementById('container').appendChild(audio)
    } else {
      console.log(blob)
    }
  })
}
