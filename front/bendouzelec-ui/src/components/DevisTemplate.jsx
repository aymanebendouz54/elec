import React from 'react';

const DevisTemplate = ({ data }) => {
  const { 
    clientName = "Client Nom", 
    clientEmail = "client@email.com",
    items = [
      { desc: "Installation Poste de Transformation 630kVA", qty: 1, unitPrice: 45000 },
      { desc: "Extension Réseau BT (Poteaux & Câblage)", qty: 5, unitPrice: 12000 },
      { desc: "Étude technique et mise en conformité ONEE", qty: 1, unitPrice: 8500 }
    ],
    date = new Date().toLocaleDateString(),
    devisNum = "DEV-2026-001"
  } = data || {};

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  const tva = subtotal * 0.20;
  const total = subtotal + tva;

  return (
    <div className="devis-container" style={{
      background: '#0a0a0a',
      color: '#fff',
      padding: '60px',
      borderRadius: '20px',
      border: '1px solid #00f2ff',
      boxShadow: '0 0 50px rgba(0, 242, 255, 0.1)',
      maxWidth: '850px',
      margin: '20px auto',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Cyber Lines */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'linear-gradient(45deg, transparent 50%, #00f2ff 50%)', opacity: 0.1 }}></div>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '60px', borderBottom: '1px solid rgba(0, 242, 255, 0.2)', paddingBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#00f2ff', margin: 0, letterSpacing: '4px' }}>BENDOUZELEC</h1>
          <p style={{ color: '#888', marginTop: '10px' }}>Expertise en Infrastructure Électrique</p>
          <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '20px' }}>
            <p>📍 Midelt, Maroc</p>
            <p>📞 +212 6 14 61 67 60</p>
            <p>✉️ aymanebendouz54@gmail.com</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '10px' }}>DEVIS PROFESSIONNEL</h2>
          <p style={{ color: '#00f2ff', fontWeight: 600 }}>N° {devisNum}</p>
          <p style={{ color: '#aaa' }}>Date: {date}</p>
        </div>
      </div>

      {/* Client Info */}
      <div style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '15px', borderLeft: '4px solid #00f2ff' }}>
        <h3 style={{ fontSize: '0.8rem', color: '#00f2ff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Destinataire</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>{clientName}</p>
        <p style={{ color: '#aaa' }}>{clientEmail}</p>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #00f2ff' }}>
            <th style={{ textAlign: 'left', padding: '15px 10px', color: '#00f2ff', fontSize: '0.9rem' }}>DESCRIPTION</th>
            <th style={{ textAlign: 'center', padding: '15px 10px', color: '#00f2ff', fontSize: '0.9rem' }}>QTÉ</th>
            <th style={{ textAlign: 'right', padding: '15px 10px', color: '#00f2ff', fontSize: '0.9rem' }}>P.U (DH)</th>
            <th style={{ textAlign: 'right', padding: '15px 10px', color: '#00f2ff', fontSize: '0.9rem' }}>TOTAL (DH)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '20px 10px', fontWeight: 500 }}>{item.desc}</td>
              <td style={{ padding: '20px 10px', textAlign: 'center' }}>{item.qty}</td>
              <td style={{ padding: '20px 10px', textAlign: 'right' }}>{item.unitPrice.toLocaleString()}</td>
              <td style={{ padding: '20px 10px', textAlign: 'right', fontWeight: 600 }}>{(item.qty * item.unitPrice).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ color: '#aaa' }}>Total HT</span>
            <span>{subtotal.toLocaleString()} DH</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ color: '#aaa' }}>TVA (20%)</span>
            <span>{tva.toLocaleString()} DH</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '20px 0', 
            marginTop: '10px', 
            borderTop: '2px solid #00f2ff',
            fontSize: '1.4rem',
            fontWeight: 900,
            color: '#00f2ff'
          }}>
            <span>TOTAL TTC</span>
            <span>{total.toLocaleString()} DH</span>
          </div>
        </div>
      </div>

      {/* Footer / Notes */}
      <div style={{ marginTop: '60px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        <p><strong>Conditions de paiement:</strong> 50% à la commande, solde à la réception des travaux.</p>
        <p>Ce devis est valable pour une durée de 30 jours.</p>
        <div style={{ textAlign: 'center', marginTop: '40px', letterSpacing: '5px', color: '#333' }}>
          BENDOUZELEC CORE SYSTEM v2.4
        </div>
      </div>
    </div>
  );
};

export default DevisTemplate;
