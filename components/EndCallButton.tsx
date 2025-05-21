"use client"
import {useCall, useCallStateHooks} from "@stream-io/video-react-sdk";
import {useRouter} from "next/navigation";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant()

    const updateInterviewStatus = useMutation(api.interviews.updateInterviewStatus);

    const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
        streamCallId: call?.id || "",
    })

    if(!call || !interview) return null;

    const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id
    if(!isMeetingOwner) return null;

    const endCall = async () => {
        try{
            await call.endCall()

            await updateInterviewStatus({
                id: interview._id,
                status: "completed"
            })
            router.push("/")
            toast.success("Meeting Ended")
        }catch (error){
            console.log(error)
            toast.error("Failed to end meeting.Please try again.")
        }
    }

    return (
        <Button variant={"destructive"} onClick={endCall}>
            End Meeting
        </Button>
    );
};

export default EndCallButton;
