import React from 'react';

const scoreCard = (props) => {

    let front9Par = props.entrant.scoreCard.h1Par + props.entrant.scoreCard.h2Par + props.entrant.scoreCard.h3Par + props.entrant.scoreCard.h4Par + props.entrant.scoreCard.h5Par + props.entrant.scoreCard.h6Par + props.entrant.scoreCard.h7Par + props.entrant.scoreCard.h8Par + props.entrant.scoreCard.h9Par;
    let back9Par = props.entrant.scoreCard.h10Par + props.entrant.scoreCard.h11Par + props.entrant.scoreCard.h12Par + props.entrant.scoreCard.h13Par + props.entrant.scoreCard.h14Par + props.entrant.scoreCard.h15Par + props.entrant.scoreCard.h16Par + props.entrant.scoreCard.h17Par + props.entrant.scoreCard.h18Par;
    let front9Score = props.entrant.scoreCard.h1Score + props.entrant.scoreCard.h2Score + props.entrant.scoreCard.h3Score + props.entrant.scoreCard.h4Score + props.entrant.scoreCard.h5Score + props.entrant.scoreCard.h6Score + props.entrant.scoreCard.h7Score + props.entrant.scoreCard.h8Score + props.entrant.scoreCard.h9Score;
    let back9Score = props.entrant.scoreCard.h10Score + props.entrant.scoreCard.h11Score + props.entrant.scoreCard.h12Score + props.entrant.scoreCard.h13Score + props.entrant.scoreCard.h14Score + props.entrant.scoreCard.h15Score + props.entrant.scoreCard.h16Score + props.entrant.scoreCard.h17Score + props.entrant.scoreCard.h18Score;
    let front9NettScore = props.entrant.scoreCard.h1NettScore + props.entrant.scoreCard.h2NettScore + props.entrant.scoreCard.h3NettScore + props.entrant.scoreCard.h4NettScore + props.entrant.scoreCard.h5NettScore + props.entrant.scoreCard.h6NettScore + props.entrant.scoreCard.h7NettScore + props.entrant.scoreCard.h8NettScore + props.entrant.scoreCard.h9NettScore;
    let back9NettScore = props.entrant.scoreCard.h10NettScore + props.entrant.scoreCard.h11NettScore + props.entrant.scoreCard.h12NettScore + props.entrant.scoreCard.h13NettScore + props.entrant.scoreCard.h14NettScore + props.entrant.scoreCard.h15NettScore + props.entrant.scoreCard.h16NettScore + props.entrant.scoreCard.h17NettScore + props.entrant.scoreCard.h18NettScore;
    let front9Points = props.entrant.scoreCard.h1Points + props.entrant.scoreCard.h2Points + props.entrant.scoreCard.h3Points + props.entrant.scoreCard.h4Points + props.entrant.scoreCard.h5Points + props.entrant.scoreCard.h6Points + props.entrant.scoreCard.h7Points + props.entrant.scoreCard.h8Points + props.entrant.scoreCard.h9Points;
    let back9Points = props.entrant.scoreCard.h10Points + props.entrant.scoreCard.h11Points + props.entrant.scoreCard.h12Points + props.entrant.scoreCard.h13Points + props.entrant.scoreCard.h14Points + props.entrant.scoreCard.h15Points + props.entrant.scoreCard.h16Points + props.entrant.scoreCard.h17Points + props.entrant.scoreCard.h18Points;
    let totalPar = front9Par + back9Par;
    let totalNett = front9NettScore + back9NettScore;
    let totalPoints = front9Points + back9Points;
    console.log(back9Par)

    return (
      <div>
      <h3>{props.entrant.member.firstName} {props.entrant.member.surname}</h3>
    <article class="front9">
    <div class="hole">
        <span span className='holeSpanH'>Front</span>
        <span span className='holeSpan'>1</span>
        <span span className='holeSpan'>2</span>
        <span span className='holeSpan'>3</span>
        <span span className='holeSpan'>4</span>
        <span span className='holeSpan'>5</span>
        <span span className='holeSpan'>6</span>
        <span span className='holeSpan'>7</span>
        <span span className='holeSpan'>8</span>
        <span span className='holeSpan'>9</span>
        <span span className='holeSpan'>Out</span>
    </div>
    <div class="par">
        <span span className='holeSpanH'>Par</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h1Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h2Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h3Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h4Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h5Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h6Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h7Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h8Par}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h9Par}</span>
        <span span className='holeSpan'>{front9Par}</span>
    </div>
    <div class="index">
        <span span className='holeSpanH'>Index</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h1Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h2Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h3Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h4Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h5Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h6Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h7Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h8Index}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h9Index}</span>
    </div>
    <div class="gross">
        <span span className='holeSpanH'>Gross</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h1Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h2Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h3Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h4Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h5Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h6Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h7Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h8Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h9Score}</span>
        <span class="sub">{front9Score}</span>
    </div>
    <div class="score">
        <span span className='holeSpanH'>Nett</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h1NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h2NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h3NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h4NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h5NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h6NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h7NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h8NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h9NettScore}</span>
        <span class="sub">{front9NettScore}</span>
    </div>
    <div class="points">
        <span span className='holeSpanH'>Points</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h1Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h2Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h3Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h4Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h5Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h6Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h7Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h8Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h9Points}</span>
        <span class="sub">{front9Points}</span>
    </div>
</article>
<article class="back9">
    <div class="hole">
        <span className='holeSpanH'>Back</span>
        <span className='holeSpan'>10</span>
        <span className='holeSpan'>11</span>
        <span className='holeSpan'>12</span>
        <span className='holeSpan'>13</span>
        <span className='holeSpan'>14</span>
        <span className='holeSpan'>15</span>
        <span className='holeSpan'>16</span>
        <span className='holeSpan'>17</span>
        <span className='holeSpan'>18</span>
        <span className='holeSpan'>In</span>
        <span className='holeSpan'>Total</span>
    </div>
    <div class="par">
        <span className='holeSpanH'>Par</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h1Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h2Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h3Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h4Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h5Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h6Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h7Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h8Par}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h9Par}</span>
        <span className='holeSpan'>{back9Par}</span>
		<span className='holeSpan'>{totalPar}</span>
    </div>
    <div class="index">
        <span className='holeSpanH'>Index</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h10Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h11Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h12Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h13Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h14Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h15Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h16Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h17Index}</span>
        <span className='holeSpan'>{props.entrant.scoreCard.h18Index}</span>
    </div>
    <div class="gross">
        <span span className='holeSpanH'>Gross</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h10Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h11Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h12Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h13Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h14Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h15Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h16Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h17Score}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h18Score}</span>
        <span class="sub">{back9Score}</span>
        <span class="total">{front9Score + back9Score}</span>
    </div>
    <div class="score">
        <span span className='holeSpanH'>Nett</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h10NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h11NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h12NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h13NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h14NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h15NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h16NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h17NettScore}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h18NettScore}</span>
        <span class="sub">{back9NettScore}</span>
        <span class="total">{totalNett}</span>
    </div>

    <div class="points">
        <span span className='holeSpanH'>Points</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h10Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h11Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h12Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h13Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h14Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h15Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h16Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h17Points}</span>
        <span span className='holeSpan'>{props.entrant.scoreCard.h18Points}</span>
        <span class="sub">{back9Points}</span>
        <span class="sub">{totalPoints}</span>
    </div>
</article>
</div>
  );
};

export default scoreCard;