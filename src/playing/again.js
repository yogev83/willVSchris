import React from "react";

const BASE_TWITTER_TEXT =
  "I scorred [SCORE] on Will vs Chris!&url=https://willvschris.netlify.app/";

export const Again = ({ onClick, score }) => {
  const encodedValue = React.useMemo(() => {
    return encodeURIComponent(BASE_TWITTER_TEXT.replace("[SCORE]", score));
  }, [score]);

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
            frameBorder="0"
            allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <a
            className="twitter-share-button"
            rel="noreferrer"
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${encodedValue}`}
          >
            <span class="twitter-label">Tweet Your Score</span>
          </a>
        </>
      ) : null}
      Play Again?
    </div>
  );
};
