
"use struct";

import React, { useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// 製品表示用
function ExternalLink({ eventId, circleId }) {

  const handleOpenLink = useCallback(() => {
    window.open(`https://techbookfest.org/event/${eventId}/circle/${circleId}`);
  }, [eventId, circleId]);

  return (
    <div
      style={{ marginLeft: 8 }}
      onClick={handleOpenLink}
    >
      <FontAwesomeIcon
        icon={faExternalLinkAlt}
        color={"gray"}
        size="lg"
      />
    </div>
  );
}

export default ExternalLink;
