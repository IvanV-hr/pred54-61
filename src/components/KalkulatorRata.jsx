import { useState } from "react";

const brojRata = [12, 24, 36, 48, 60];

const KalkulatorRata = ({ cijenaVozila }) => {
  const [ucesce, setUcesce] = useState(0);

  const iznos = Math.max(cijenaVozila - ucesce, 0);

  return (
    <section className="section">
      <h2>Informativni izračun rata</h2>
      <div className="kalkulator-rata">
        <div className="forma">
          <label htmlFor="ucesce">Učešće ($)</label>
          <input
            type="number"
            id="ucesce"
            min="0"
            value={ucesce}
            onChange={(e) => setUcesce(e.target.value)}
          />
          <p className="iznos-otplate">Iznos za otplatu</p>
          <p className="cijena-usluge">{iznos.toFixed(2)} $</p>
        </div>
        <table className="kalkulator-tablica">
          <thead>
            <tr>
              <th>Broj rata</th>
              <th>Mjesecna rata</th>
            </tr>
          </thead>
          <tbody>
            {brojRata.map((broj) => (
              <tr key={broj}>
                <td>{broj}</td>
                <td>{(iznos / broj).toFixed(2)} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default KalkulatorRata;
