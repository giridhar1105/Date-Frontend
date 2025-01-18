import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    padding: 20px;
`;

const VideoContainer = styled.div`
    width: 400px;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    animation: ${fadeIn} 0.6s ease-out;
    margin-bottom: 20px;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledInput = styled.input`
    width: 300px;
    padding: 12px 20px;
    margin: 10px 0;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.6s ease-out;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
        transform: scale(1.02);
    }
`;

const JoinButton = styled.button`
    padding: 12px 40px;
    border: none;
    border-radius: 8px;
    background: #22c55e;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.6s ease-out, ${pulse} 2s infinite;

    &:hover {
        background: #16a34a;
        transform: translateY(-2px);
    }
`;

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            const audioTrack = stream.getAudioTracks()[0];
            const videoTrack = stream.getVideoTracks()[0];
            setLocalAudioTrack(audioTrack);
            setlocalVideoTrack(videoTrack);
            if (videoRef.current) {
                videoRef.current.srcObject = new MediaStream([videoTrack]);
                videoRef.current.play();
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            getCam();
        }

        return () => {
            localAudioTrack?.stop();
            localVideoTrack?.stop();
        };
    }, [videoRef]);

    if (!joined) {
        return (
            <Container>
                <h1 className="text-blue-700" >Video Random Call</h1>
                <VideoContainer>
                    <video autoPlay ref={videoRef}></video>
                </VideoContainer>
                <JoinButton onClick={() => setJoined(true)}>Join Room</JoinButton>
            </Container>
        );
    }

    return (
        <Room
            name={name}
            localAudioTrack={localAudioTrack}
            localVideoTrack={localVideoTrack}
        />
    );
};