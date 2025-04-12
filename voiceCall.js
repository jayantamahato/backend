import VoiceCallModel from "./voiceCallModel.js";

const event = Object.freeze({
  OFFER: "offer",
  ANSWER: "answer",
  CANDIDATE: "iceCandidate",
  HOST_CANDIDATE: "hostIceCandidate",
  LEAVE: "leave",
});
export const voiceCallListener = (socket, io) => {
  socket.on(event.OFFER, (data) => {
    console.log(data.type);

    VoiceCallModel.create({
      from: "user1",
      to: "user2",
      offer: data.sdp,
    });
    io.emit(event.OFFER, data.sdp);
  });

  socket.on(event.ANSWER, (data) => {
    console.log(data);
    io.emit(event.ANSWER, data.sdp);
  });

  socket.on(event.HOST_CANDIDATE, (data) => {
    console.log(data);
    io.emit(event.HOST_CANDIDATE, data);
  });
  socket.on(event.CANDIDATE, (data) => {
    console.log(data);
    io.emit(event.CANDIDATE, data);
  });
  socket.on(event.LEAVE, (data) => {
    socket.to(data.to).emit(event.LEAVE, data.from);
  });
};
