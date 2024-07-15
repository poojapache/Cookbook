import React,{ useState } from "react";
import VideoContainer from "../Containers/VideoContainer";
import ContentContainer from "../Containers/ContentContainer";

export default function MainPage(){
    const [video, setVideo] = useState(true);
    const onClickExplore = ()=>{
        setVideo(false);
    }

    const reloadPage = () => {
        window.location.reload();
    };

    return(
    <div>
        <h1 className="logo" onClick={reloadPage}><span>C</span>ookbook</h1>
        {
            video?
            <VideoContainer onClickExplore = {onClickExplore}/>:
            <ContentContainer/>
        }
    </div>);
}