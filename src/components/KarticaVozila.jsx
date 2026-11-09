import { Link } from "react-router";
import { Button } from "./Button";
import { najviseAutaUsporedba } from "../konstante/constants";

const KarticaVozila = ({ vozilo, usporedba, onUsporedi }) => {
  const uUsporedbi = usporedba.some((odabrano) => odabrano.id === vozilo.id);

  return (
    <div
      className={
        uUsporedbi
          ? "kartica kartica-vozila u-usporedbi"
          : "kartica kartica-vozila"
      }
    >
      <img
        className="kartica-slika"
        src={vozilo.thumbnail}
        alt={vozilo.title}
      />
      <div className="kartica-sadrzaj">
        <p className="oznaka">{vozilo.brand}</p>
        <h3>{vozilo.title}</h3>
        <p>Ocjena kupaca: {vozilo.rating} / 5</p>
        <p className="cijena-kartice">{vozilo.price.toFixed(2)} $</p>
        <Link className="gumb" to={`/vozila/${vozilo.id}`}>
          Detalji
        </Link>
        <Button
          className={uUsporedbi ? "gumb gumb-ukloni" : "gumb gumb-povratak"}
          disabled={usporedba.length === najviseAutaUsporedba && !uUsporedbi}
          onClick={() => onUsporedi(vozilo)}
        >
          {uUsporedbi ? "Uklonite iz usporedbe" : "Dodajte u usporedbu"}
        </Button>
      </div>
    </div>
  );
};

export default KarticaVozila;
