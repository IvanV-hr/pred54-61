import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { Button } from "../components/Button";
import KarticaVozila from "../components/KarticaVozila";
import FilterVozila from "../components/FilterVozila";
import { najviseAutaUsporedba } from "../konstante/constants";
import UsporedbaVozila from "../components/UsporedbaVozila";

const pocetniFilteri = {
  pojamPretrage: "",
  cijenaOd: "",
  odabranaMarka: "Sve",
  cijenaDo: "",
  najmanjaOcjena: "",
  redoslijed: "zadano",
};

const Vozila = () => {
  const [vozila, setVozila] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [brojPokusaja, setBrojPokusaja] = useState(0);
  const [filteri, setFilteri] = useState(pocetniFilteri);
  const [usporedba, setUsporedba] = useState([]);

  useEffect(() => {
    async function dohvatiVozila() {
      try {
        const response = await apiRequest("/products/category/vehicle");
        setVozila(response.products);
      } catch {
        setGreska("Prikaz vozila nije uspio. Pokušajte ponovo.");
      } finally {
        setUcitavanje(false);
      }
    }
    dohvatiVozila();
  }, [brojPokusaja]);

  function pokusajPonovo() {
    setUcitavanje(true);
    setGreska("");
    setBrojPokusaja(brojPokusaja + 1);
  }

  function promijeniUsporedbu(vozilo) {
    if (usporedba.some((odabrano) => odabrano.id === vozilo.id)) {
      setUsporedba(usporedba.filter((odabrano) => odabrano.id !== vozilo.id));
    } else {
      setUsporedba([...usporedba, vozilo]);
    }
  }

  function promijeniFilter(event) {
    setFilteri({ ...filteri, [event.target.name]: event.target.value });
  }

  const pojamPretrage = filteri.pojamPretrage.trim().toLowerCase();

  const sveMarkeVozila = vozila.map((vozilo) => vozilo.brand);

  const markeVozilaFilter = [
    "Sve",
    ...sveMarkeVozila.filter(
      (marka, index) => sveMarkeVozila.indexOf(marka) === index,
    ),
  ];

  const filtriranaVozila = vozila.filter(
    (vozilo) =>
      `${vozilo.title} ${vozilo.brand}`.toLowerCase().includes(pojamPretrage) &&
      vozilo.price >= 0 &&
      (filteri.cijenaDo === "" || vozilo.price <= Number(filteri.cijenaDo)) &&
      vozilo.rating >= Number(filteri.najmanjaOcjena) &&
      (filteri.odabranaMarka === "Sve" ||
        filteri.odabranaMarka === vozilo.brand),
  );

  if (filteri.redoslijed === "najjeftiniji") {
    filtriranaVozila.sort((a, b) => a.price - b.price);
  }

  if (filteri.redoslijed === "najskuplji") {
    filtriranaVozila.sort((a, b) => b.price - a.price);
  }

  if (filteri.redoslijed === "najboljaOcjena") {
    filtriranaVozila.sort((a, b) => b.rating - a.rating);
  }

  const najboljeOcijenjenoVozilo = vozila.reduce(
    (najbolje, vozilo) => (vozilo.rating > najbolje.rating ? vozilo : najbolje),
    vozila[0],
  );
  const najjeftinijeVozilo = vozila.reduce(
    (najjeftinije, vozilo) =>
      vozilo.price < najjeftinije.price ? vozilo : najjeftinije,
    vozila[0],
  );

  return (
    <>
      {vozila.length > 0 && (
        <section className="section">
          <h2>Izdvojeno iz ponude</h2>
          <p>Auto s najboljom ocjenom i najjeftiniji auto u ponudi.</p>
          <div className="kartice kartice-vozila">
            <KarticaVozila
              vozilo={najboljeOcijenjenoVozilo}
              usporedba={usporedba}
              onUsporedi={promijeniUsporedbu}
            />
            <KarticaVozila
              vozilo={najjeftinijeVozilo}
              usporedba={usporedba}
              onUsporedi={promijeniUsporedbu}
            />
          </div>
        </section>
      )}
      <section className="section">
        <h2>Auti na prodaju</h2>
        <p>Pogledajte naše automobile.</p>
        {ucitavanje && <p>Učitavanje vozila...</p>}
        {greska && (
          <>
            <p>{greska}</p>
            <Button onClick={pokusajPonovo}>Pokušajte ponovo</Button>
          </>
        )}
        <FilterVozila
          filteri={filteri}
          marke={markeVozilaFilter}
          onPromjeni={promijeniFilter}
          onPonisti={() => setFilteri(pocetniFilteri)}
        />
        {!ucitavanje && !greska && (
          <p>
            {filtriranaVozila.length === 0
              ? "Nema vozila za odabrane filtere."
              : `Broj pronađenih vozila za odabrane filtere: ${filtriranaVozila.length}`}
          </p>
        )}
        {!!usporedba.length && (
          <p>
            Odabrano za usporedbu: {usporedba.length} od {najviseAutaUsporedba}.
            <a href="#usporedba">Otvorite Usporedbu</a>
          </p>
        )}
        {usporedba.length === najviseAutaUsporedba && (
          <p>Usporedba je puna. Uklonite auto da biste dodali drugi.</p>
        )}
        <div className="kartice kartice-vozila">
          {filtriranaVozila.map((vozilo) => (
            <KarticaVozila
              key={vozilo.id}
              vozilo={vozilo}
              onUsporedi={promijeniUsporedbu}
              usporedba={usporedba}
            />
          ))}
        </div>
      </section>
      {!!usporedba.length && (
        <UsporedbaVozila
          usporedba={usporedba}
          onUkloni={promijeniUsporedbu}
          onOcisti={() => setUsporedba([])}
        />
      )}
    </>
  );
};

export default Vozila;
