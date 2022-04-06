import React from "react";

export const Again = ({ onClick, score }) => {
  console.log(score);
  return (
    <div className="tryAgain" onClick={onClick}>
      {score ? (
        <>
          <div>Your Score: {score}</div>
          <iframe
            title="fbShare"
            src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwillvschris.netlify.app%2F&layout=button_count&size=small&width=77&height=20&appId"
            width="77"
            height="20"
            style={{ border: "none", overflow: "hidden", margin: 20 }}
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </>
      ) : null}
      Play Again?
    </div>
  );
};
