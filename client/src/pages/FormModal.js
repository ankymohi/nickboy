import React, { useState } from "react";

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [files, setFiles] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
    video: null,
  });

  const [formData, setFormData] = useState({
    nome: "",
    nascimento: "",
    idade: "",
    cidadeEstado: "",
    email: "",
    telefone: "",
    instagram: "",
    cnpj: "",
    altura: "",
    peso: "",
    olhos: "",
    cabelo: "",
    pele: "",
    tattoos: "",
    estilo: "",
    sensualNivel: "",
    experiencia: "",
    vinculo: "",
    disponibilidade: "",
    horarios: "",
    autorizaImagem: "",
    diretrizes: "",
    restricoes: "",
    motivo: "",
    adicional: "",
    assinatura: "",
    data: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();

    Object.keys(formData).forEach((key) => {
      sendData.append(key, formData[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) sendData.append(key, files[key]);
    });

    try {
      const response = await fetch("https://nickboy.onrender.com/send-form", {
        method: "POST",
        body: sendData,
      });

      if (response.ok) {
        alert("Form sent successfully!");
        setIsOpen(false);
      } else {
        alert("Failed to send form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  if (!isOpen) {
    return (
      <div style={{
        minHeight: '100vh',background: 'linear-gradient(to right, #d41322, #e2b77a, #e7222f)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(to right, #d41322, #e2b77a, #e7222f)',
            color: 'white',
            fontWeight: 'bold',
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            fontSize: '1.125rem',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Open Application Form
        </button>
      </div>
    );
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '8px',
  
    outline: 'none',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const sectionStyle = {
    background: 'rgba(30, 41, 59, 0.5)',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid rgba(168, 85, 247, 0.2)'
  };

  const headingStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#d8b4fe',
    borderBottom: '1px solid rgba(168, 85, 247, 0.5)',
    paddingBottom: '12px',
    marginTop: '0',
    marginBottom: '16px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 9999,
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'linear-gradient(to right, #d41322, #e2b77a, #e7222f)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '1200px',
        margin: '32px auto',
        border: '1px solid rgba(168, 85, 247, 0.3)'
      }}>
        
        {/* Header */}
        <div style={{
          
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '0'
          }}>VGD Agency</h2>
          <p style={{
            color: '#e9d5ff',
            fontSize: '0.875rem',
            margin: '8px 0 0 0'
          }}>Application Form</p>
        </div>

        {/* Form Content */}
        <div style={{ 
          padding: '32px 16px',
          maxHeight: '80vh', 
          overflowY: 'auto' 
        }}>

          {/* Personal Information */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>👤 Personal Information</h3>
            <div style={gridStyle}>
              <input 
                style={inputStyle} 
                name="nome" 
                placeholder="Full Name *" 
                onChange={handleChange} 
                value={formData.nome} 
                required 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="nascimento" 
                type="date" 
                onChange={handleChange} 
                value={formData.nascimento} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="idade" 
                type="number" 
                placeholder="Age" 
                onChange={handleChange} 
                value={formData.idade} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="cidadeEstado" 
                placeholder="City & State" 
                onChange={handleChange} 
                value={formData.cidadeEstado} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="email" 
                type="email" 
                placeholder="Email *" 
                onChange={handleChange} 
                value={formData.email} 
                required 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="telefone" 
                placeholder="Phone/WhatsApp" 
                onChange={handleChange} 
                value={formData.telefone} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="instagram" 
                placeholder="Instagram @" 
                onChange={handleChange} 
                value={formData.instagram} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <select 
                style={selectStyle} 
                name="cnpj" 
                onChange={handleChange} 
                value={formData.cnpj}
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              >
                <option value="">Do you have CNPJ?</option>
                <option value="Sim">Yes</option>
                <option value="Não">No</option>
              </select>
            </div>
          </div>

          {/* Physical Appearance */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>✨ Physical Appearance</h3>
            <div style={{...gridStyle, marginBottom: '16px'}}>
              <input 
                style={inputStyle} 
                name="altura" 
                placeholder="Height (cm)" 
                onChange={handleChange} 
                value={formData.altura} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="peso" 
                placeholder="Weight (kg)" 
                onChange={handleChange} 
                value={formData.peso} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="olhos" 
                placeholder="Eye Color" 
                onChange={handleChange} 
                value={formData.olhos} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="cabelo" 
                placeholder="Hair Color" 
                onChange={handleChange} 
                value={formData.cabelo} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="pele" 
                placeholder="Skin Tone" 
                onChange={handleChange} 
                value={formData.pele} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="tattoos" 
                placeholder="Visible Tattoos/Piercings?" 
                onChange={handleChange} 
                value={formData.tattoos} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
            </div>
            <input 
              style={{...inputStyle, marginBottom: '16px'}} 
              name="estilo" 
              placeholder="Visual Style / Aesthetic" 
              onChange={handleChange} 
              value={formData.estilo} 
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            />
            <select 
              style={selectStyle} 
              name="sensualNivel" 
              onChange={handleChange} 
              value={formData.sensualNivel}
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            >
              <option value="">Comfort Level with Sensual Content (18+)</option>
              <option value="Baixo">Low</option>
              <option value="Médio">Medium</option>
              <option value="Alto">High</option>
            </select>
          </div>

          {/* Experience & Availability */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>🎬 Experience & Availability</h3>
            <textarea 
              style={{...textareaStyle, marginBottom: '16px'}}
              name="experiencia" 
              placeholder="Previous modeling/content creation experience..." 
              onChange={handleChange}
              value={formData.experiencia}
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            />
            <div style={{...gridStyle, marginBottom: '16px'}}>
              <select 
                style={selectStyle} 
                name="vinculo" 
                onChange={handleChange} 
                value={formData.vinculo}
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              >
                <option value="">Linked to another agency?</option>
                <option value="Sim">Yes</option>
                <option value="Não">No</option>
              </select>
              <select 
                style={selectStyle} 
                name="disponibilidade" 
                onChange={handleChange} 
                value={formData.disponibilidade}
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              >
                <option value="">Available for shoots?</option>
                <option value="Sim">Yes</option>
                <option value="Não">No</option>
              </select>
            </div>
            <input 
              style={inputStyle} 
              name="horarios" 
              placeholder="Preferred schedule/hours" 
              onChange={handleChange} 
              value={formData.horarios} 
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            />
          </div>

          {/* Rights & Agreements */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>📋 Rights & Agreements</h3>
            <div style={{...gridStyle, marginBottom: '16px'}}>
              <select 
                style={selectStyle} 
                name="autorizaImagem" 
                onChange={handleChange} 
                value={formData.autorizaImagem}
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              >
                <option value="">Authorize image usage?</option>
                <option value="Sim">Yes</option>
                <option value="Não">No</option>
              </select>
              <select 
                style={selectStyle} 
                name="diretrizes" 
                onChange={handleChange} 
                value={formData.diretrizes}
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              >
                <option value="">Agree with guidelines?</option>
                <option value="Sim">Yes</option>
                <option value="Não">No</option>
              </select>
            </div>
            <textarea 
              style={textareaStyle}
              name="restricoes" 
              placeholder="Content restrictions or boundaries..." 
              onChange={handleChange}
              value={formData.restricoes}
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            />
          </div>

          {/* Photos & Video */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>📸 Photos & Video</h3>
            <div style={gridStyle}>
              <div>
                <label style={{display: 'block', color: '#e9d5ff', fontSize: '0.875rem', marginBottom: '8px'}}>Face Photo</label>
                <input 
                  style={inputStyle} 
                  type="file" 
                  name="photo1" 
                  accept="image/*" 
                  onChange={fileChange} 
                />
              </div>
              <div>
                <label style={{display: 'block', color: '#e9d5ff', fontSize: '0.875rem', marginBottom: '8px'}}>Full Body Photo</label>
                <input 
                  style={inputStyle} 
                  type="file" 
                  name="photo2" 
                  accept="image/*" 
                  onChange={fileChange} 
                />
              </div>
              <div>
                <label style={{display: 'block', color: '#e9d5ff', fontSize: '0.875rem', marginBottom: '8px'}}>Half Body Photo</label>
                <input 
                  style={inputStyle} 
                  type="file" 
                  name="photo3" 
                  accept="image/*" 
                  onChange={fileChange} 
                />
              </div>
              <div>
                <label style={{display: 'block', color: '#e9d5ff', fontSize: '0.875rem', marginBottom: '8px'}}>Video (Optional)</label>
                <input 
                  style={inputStyle} 
                  type="file" 
                  name="video" 
                  accept="video/*" 
                  onChange={fileChange} 
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>💭 Additional Information</h3>
            <textarea 
              style={{...textareaStyle, marginBottom: '16px'}}
              name="motivo" 
              placeholder="Why do you want to join VGD Agency?" 
              onChange={handleChange}
              value={formData.motivo}
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            />
            <textarea 
              style={{...textareaStyle, marginBottom: '16px'}}
              name="adicional" 
              placeholder="Any additional information you'd like to share..." 
              onChange={handleChange}
              value={formData.adicional}
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
            />
            <div style={gridStyle}>
              <input 
                style={inputStyle} 
                name="assinatura" 
                placeholder="Signature (full name)" 
                onChange={handleChange} 
                value={formData.assinatura} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
              <input 
                style={inputStyle} 
                name="data" 
                type="date" 
                onChange={handleChange} 
                value={formData.data} 
                onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)'}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            paddingTop: '24px',
            flexWrap: 'wrap'
          }}>
            <button 
              type="button"
              onClick={handleSubmit}
              style={{
                flex: '1',
                minWidth: '200px',
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                color: 'white',
                fontWeight: 'bold',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1.125rem',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              ✨ Submit Application
            </button>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              style={{
                padding: '16px 32px',
                background: '#475569',
                color: 'white',
                fontWeight: '600',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                minWidth: '150px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#334155'}
              onMouseOut={(e) => e.target.style.background = '#475569'}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
