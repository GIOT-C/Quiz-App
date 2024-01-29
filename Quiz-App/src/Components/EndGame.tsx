import endGameStyles from "./EndGame.module.css";

interface Props {
  handleRestartGame: () => void;
  result: number;
}
function EndGame(props: Props) {
  return (
    <>
      <div className={endGameStyles.endGame}>
        <div className={endGameStyles.restartGame}>
          <p>
            სამწუხაროდ თამაში დასრულდა. შენი შედეგია{" "}
            <span className={endGameStyles.result}>{props.result}</span>
          </p>
          <p>კიდევ გაქვს შანსი თავიდან სცადო და გააუმჯობესო შენი შედეგი</p>
          <div className={endGameStyles.restartButtonContainer}>
            <button
              className={endGameStyles.restartButton}
              onClick={() => props.handleRestartGame()}
            >
              თავიდან დაწყება
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndGame;
