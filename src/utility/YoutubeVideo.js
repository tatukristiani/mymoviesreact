import React from "react";
import PropTypes from "prop-types";
import '../utility/YoutubeVideo.css';

/**
 * Used for showing the trailer video. If the give embedId doesn't exist. It doesn't show any video.
 * @param embedId youtube videos unique id.
 * @returns {JSX.Element} div with iframe that contains the YouTube video.
 * @constructor Creates the YoutubeEmbed component with the given embedId.
 */
const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;