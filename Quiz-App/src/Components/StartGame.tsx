import startGameStyles from "./startGame.module.css";
import styles from "./Quiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setStateForStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

function StartGame(props: Props) {
  return (
    <>
      <div className={startGameStyles.parent}>
        <div className={startGameStyles.startGame}>
          <h2 className={startGameStyles.nameOfGame}>QuizApp</h2>
          <p className={startGameStyles.aboutGamePartOne}>
            მოგესალმებით! ეს არის ინტელექტუალური თამაში QuizApp, რომელიც მოიცავს
            ზოგად შეკითხვებს სხვადასხვა კატეგორიიდან.
          </p>
          <p className={startGameStyles.aboutGamePartTwo}>
            თამაშის არსი მდგომარეობს შემდეგში: ეკრანზე გამოვა შეკითხვა რომელსაც
            ექნება ოთხი სავარაუდო პასუხი. თუ შეკითხვას სწორად გასცემთ პასუხს
            ავტომატურად გადახვალთ შემდეგ შეკითხვაზე.
          </p>
          <p className={startGameStyles.aboutGamePartThree}>
            თვითოეულ შეკითხვას აქვს დროის 120 წამიანი ტაიმერი. თუ ამ დროში არ
            უპასუხებთ კითხვას, თამაში დასრულდება
          </p>
          <p className={startGameStyles.infoAboutBenefits}>
            თამაშს აქვს ასევე ბენეფიტები შეზღუდული რაოდენობით!
          </p>

          <div className={startGameStyles.descriptionOfBenefitsContainer}>
            <div>
              <div className={startGameStyles.descriptionOfBenefits}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={styles.faMagnifyingGlass}
                />
                <div className={startGameStyles.childDescription}>
                  <p>დატოვებს 2 შესაძლო სწორ პასუხს.</p>
                  <p>
                    თუ უპასუხებ 15 კითხვას, ბონუსად მიიღებ პლიუს 1 დახმარებას
                  </p>
                </div>
              </div>

              <div className={startGameStyles.descriptionOfBenefits}>
                <FontAwesomeIcon
                  icon={faHandshakeAngle}
                  className={styles.faHandshakeAngle}
                />
                <div className={startGameStyles.childDescription}>
                  <p>მითითება სწორ პასუხზე</p>
                  <p>
                    თუ უპასუხებ 30 კითხვას, ბონუსად მიიღებ პლიუს 1 დახმარებას
                  </p>
                </div>
              </div>

              <div className={startGameStyles.descriptionOfBenefits}>
                <FontAwesomeIcon icon={faHeart} className={styles.faHeart} />
                <div className={startGameStyles.childDescription}>
                  <p>ერთი შეცდომის უფლება</p>
                  <p>
                    თუ უპასუხებ 45 კითხვას, ბონუსად მიიღებ პლიუს 1 დახმარებას
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className={startGameStyles.contact}>
            თუ თამაშში აღმოაჩენთ რაიმე ხარვეზს ან შეცდომას გთხოვთ მოგვწერეთ
            ელ-ფოსტაზე{" "}
            <a
              target="_blank"
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#search/giootarashvili77%40gmail.com?compose=new"
            >
              giootarashvili77@gmail.com{" "}
            </a>
          </p>

          <button
            className={startGameStyles.buttonForStartGame}
            onClick={() => props.setStateForStartGame(true)}
          >
            თამაშის დაწყება
          </button>
        </div>
      </div>
    </>
  );
}

export default StartGame;
