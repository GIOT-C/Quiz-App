import winGameStyles from "./WinGame.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
function WinGame() {
  return (
    <>
      <div className={winGameStyles.winGameParent}>
        <div className={winGameStyles.winGame}>
          <div>
            <div className={winGameStyles.celebrating}>
              <h2>გ ი ლ ო ც ა ვ</h2>
              <FontAwesomeIcon
                icon={faGraduationCap}
                className={winGameStyles.faGraduationCap}
              />
            </div>

            <p className={winGameStyles.congratulationTextOne}>
              შემიძლია ამაყად განვაცხადო, რომ შენ ნამდვილად მაღალი ინტელექტის
              მქონე ადამიანი ხარ!
            </p>
            <p className={winGameStyles.congratulationTextTwo}>
              ასევე მინდა მადლობა გადაგიხადო, რომ ბოლომდე დარჩი თამაშში.
            </p>
            <p className={winGameStyles.congratulationTextThree}>
              წარმატებებს გისურვებ! ასე განაგრძე და აიმაღლე ინტელექტი.
            </p>
            <p className={winGameStyles.congratulationTextFour}>
              მე კი შევეცდები მომავალში უკეთესი და უფრო საინტერესო პროდუქტი
              შემოგთავაზოთ.
            </p>
            <p className={winGameStyles.congratulationTextFive}>
              დროებით
              <FontAwesomeIcon
                icon={faHeart}
                className={winGameStyles.faHeart}
              />
            </p>

            <div className={winGameStyles.contact}>
              <div className={winGameStyles.socialetwork}>
                <a
                  target="_blank"
                  href="https://www.facebook.com/gio.otarashvili.75/"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className={winGameStyles.faFacebook}
                  />
                </a>
              </div>

              <div className={winGameStyles.socialetwork}>
                <a target="_blank" href="https://github.com/GIOT-C">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className={winGameStyles.faGithub}
                  />
                </a>
              </div>

              <div className={winGameStyles.socialetwork}>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/gio-otarashvili-ba2175271/"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className={winGameStyles.faLinkedin}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WinGame;
