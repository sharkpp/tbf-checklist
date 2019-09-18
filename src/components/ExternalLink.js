
"use struct";

import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

// 製品表示用
function ExternalLink({ eventId, circleId }) {

  const handleOpenLink = useCallback(() => {
    window.open(`https://techbookfest.org/event/${eventId}/circle/${circleId}`);
  }, [circleId]);

  return (
    <div
      style={{ paddingLeft: 4 }}
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
