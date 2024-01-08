import "./delivery-method-selector.scss";
export default function DeliveryMethodSelector({
  deliveryMethod,
  handleDeliverySelection,
}) {
  return (
    <div className="delivery-method-selector">
      <select
        className="delivery-selector"
        value={deliveryMethod}
        onChange={handleDeliverySelection}
        autoFocus={true}
      >
        <option disabled selected hidden value="">
          Házhozszállítási forma kiválasztása
        </option>
        <option value="FoxPost Automata">FoxPost csomagautomata 990Ft</option>
        <option value="FoxPost Házhozszállítás">
          FoxPost házhozszállítás 1590Ft
        </option>
        <option value="Posta Házhozszállítás">
          Magyar Posta házhozszállítás 1190Ft
        </option>
      </select>
    </div>
  );
}
