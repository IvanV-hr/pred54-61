import { Button } from "./Button";

const UsporedbaVozila = ({ usporedba, onUkloni, onOcisti }) => {
  const najnizaCijena = Math.min(...usporedba.map((vozilo) => vozilo.price));
  const najveciPopust = Math.max(
    ...usporedba.map((vozilo) => vozilo.discountPercentage),
  );
  const najboljaOcjena = Math.max(...usporedba.map((vozilo) => vozilo.rating));

  return (
    <section id="usporedba" className="section usporedba-vozila">
      <h2>Usporedba odabranih auta</h2>
      <p>Istaknute su najbolje vrijednosti.</p>
      <div className="usporedba-wrapper">
        <table className="tablica-usporedbe">
          <thead>
            <tr>
              <th></th>
              {usporedba.map((vozilo) => (
                <th key={vozilo.id}>
                  <img
                    className="kartica-slika"
                    src={vozilo.thumbnail}
                    alt={vozilo.title}
                  />
                  <p className="oznaka">{vozilo.brand}</p>
                  {vozilo.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cijena</th>
              {usporedba.map((vozilo) => (
                <td
                  key={vozilo.id}
                  className={vozilo.price === najnizaCijena ? "najbolje" : ""}
                >
                  {vozilo.price.toFixed(2)} $
                </td>
              ))}
            </tr>
            <tr>
              <th>Mjesečna rata (60 rata)</th>
              {usporedba.map((vozilo) => (
                <td key={vozilo.id}>{`${(vozilo.price / 60).toFixed(2)} $`}</td>
              ))}
            </tr>
            <tr>
              <th>Popust</th>
              {usporedba.map((vozilo) => (
                <td
                  key={vozilo.id}
                  className={
                    vozilo.discountPercentage === najveciPopust
                      ? "najbolje"
                      : ""
                  }
                >
                  {vozilo.discountPercentage} %
                </td>
              ))}
            </tr>
            <tr>
              <th>Ocjena kupaca</th>
              {usporedba.map((vozilo) => (
                <td
                  key={vozilo.id}
                  className={vozilo.rating === najboljaOcjena ? "najbolje" : ""}
                >
                  {vozilo.rating} / 5
                </td>
              ))}
            </tr>
            <tr>
              <th>Težina</th>
              {usporedba.map((vozilo) => (
                <td key={vozilo.id}>{vozilo.weight} t</td>
              ))}
            </tr>
            <tr>
              <th></th>
              {usporedba.map((vozilo) => (
                <td key={vozilo.id}>
                  <Button
                    className="gumb gumb-povratak"
                    onClick={() => onUkloni(vozilo)}
                  >
                    Uklonite
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="actions">
        <Button className="gumb gumb-povratak" onClick={onOcisti}>
          Očistite usporedbu
        </Button>
      </div>
    </section>
  );
};

export default UsporedbaVozila;
