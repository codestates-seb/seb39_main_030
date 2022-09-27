export const getMedia = async (myVideoRef, userVideoRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
    return stream;
  } catch (e) {
    console.error(e);
  }
};
