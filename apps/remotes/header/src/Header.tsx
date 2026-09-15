export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '12px 24px',
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#fce000', display: 'grid', placeItems: 'center',
            fontWeight: 700, color: '#000',
          }}
        >
          Я
        </div>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Marketplace</span>
      </div>

      <button
        style={{
          background: '#fce000', border: 'none', borderRadius: 8,
          padding: '8px 16px', fontWeight: 600, cursor: 'pointer',
        }}
      >
        Каталог
      </button>

      <input
        placeholder="Найти товары"
        style={{
          flex: 1, padding: '10px 16px',
          border: '2px solid #fce000', borderRadius: 8, outline: 'none',
        }}
      />

      <span style={{ marginLeft: 'auto', color: '#666' }}>Войти</span>
    </header>
  );
}