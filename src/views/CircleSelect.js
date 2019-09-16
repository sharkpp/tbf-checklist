"use struct";

import React, { useEffect, useState } from 'react';

function CircleSelectView({ models, history, params }) {
　console.log('CircleSelectView',{models,params});
  const { circle } = models;
  const { event, circleId } = params;

  const [ circleInfo, setCircleInfo ] = useState();

  useEffect(() => {
    const currentCircleInfo = circle.getCircle(circleId);
    setCircleInfo(currentCircleInfo);
    return () => {};
  }, [circle, circleId]);

  useEffect(() => {console.log('CircleSelectView','useEffect');
    const onChange = () => {
      console.log('CircleSelectView','onChange',[event, circle, circleId, history]);
      if (!circleId) {
        // サークルを選択していない場合は一番初めのサークルの飛ぶ
        const firstCircleInfo = circle.getFirstBooth();
        if (firstCircleInfo) {
          history.replace(`/${event}/circle/${firstCircleInfo.id}`);
        }
      }
      else {
        // 今のサークルを表示
        const currentCircleInfo = circle.getCircle(circleId);
        setCircleInfo(currentCircleInfo);
      }
    };
    circle.on('change',onChange);
    // クリーンアップ関数を返す
    return () => circle.off('change',onChange);
  }, [event, circle, circleId, history]);


  return (
    <div>
      {!circleId || !circleInfo ? <div>loading</div> : <div>{JSON.stringify(circleInfo)}</div>}
    </div>
  );
}

export default CircleSelectView;
