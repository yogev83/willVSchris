import React from "react";

export const Again = ({ onClick, win }) => {
  return (
    <div className="tryAgain" onClick={onClick}>
      {win ? (
        <div
          class="fb-share-button"
          data-href="https://willvschris.netlify.app/"
          data-layout="button_count"
          data-size="large"
        >
          <a
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwillvschris.netlify.app%2F&amp;src=sdkpreparse"
            class="fb-xfbml-parse-ignore"
            rel="noreferrer"
          >
            Share
          </a>
        </div>
      ) : null}
      Play Again?
    </div>
  );
};
