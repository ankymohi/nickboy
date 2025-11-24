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
        alert("Formulário enviado com sucesso!");
        setIsOpen(false);
      } else {
        alert("Falha ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Ocorreu um erro. Veja o console para detalhes.");
    }
  };

  if (!isOpen) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #d41322, #e2b77a, #e7222f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: "linear-gradient(to right, #d41322, #e2b77a, #e7222f)",
            color: "white",
            fontWeight: "bold",
            padding: "1rem 2rem",
            borderRadius: "12px",
            border: "none",
            fontSize: "1.125rem",
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Abrir Formulário de Aplicação
        </button>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(168, 85, 247, 0.3)",
    borderRadius: "8px",
    outline: "none",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const sectionStyle = {
    background: "rgba(30, 41, 59, 0.5)",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "24px",
    border: "1px solid rgba(168, 85, 247, 0.2)",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#d8b4fe",
    borderBottom: "1px solid rgba(168, 85, 247, 0.5)",
    paddingBottom: "12px",
    marginTop: "0",
    marginBottom: "16px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "16px",
        zIndex: 9999,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "linear-gradient(to right, #d41322, #e2b77a, #e7222f)",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "1200px",
          margin: "32px auto",
          border: "1px solid rgba(168, 85, 247, 0.3)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
              margin: "0",
            }}
          >
            VGD Agency
          </h2>
          <p
            style={{
              color: "#e9d5ff",
              fontSize: "0.875rem",
              margin: "8px 0 0 0",
            }}
          >
            Formulário de Aplicação
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: "32px 16px", maxHeight: "80vh", overflowY: "auto" }}>

          {/* --- PERSONAL --- */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>👤 Informações Pessoais</h3>

            <div style={gridStyle}>
              <input
                style={inputStyle}
                name="nome"
                placeholder="Nome Completo *"
                onChange={handleChange}
                value={formData.nome}
                required
              />

              <input
                style={inputStyle}
                type="date"
                name="nascimento"
                placeholder="Data de Nascimento"
                onChange={handleChange}
                value={formData.nascimento}
              />

              <input
                style={inputStyle}
                type="number"
                name="idade"
                placeholder="Idade"
                onChange={handleChange}
                value={formData.idade}
              />

              <input
                style={inputStyle}
                name="cidadeEstado"
                placeholder="Cidade / Estado"
                onChange={handleChange}
                value={formData.cidadeEstado}
              />

              <input
                style={inputStyle}
                name="email"
                type="email"
                placeholder="Email *"
                onChange={handleChange}
                value={formData.email}
                required
              />

              <input
                style={inputStyle}
                name="telefone"
                placeholder="Telefone / WhatsApp"
                onChange={handleChange}
                value={formData.telefone}
              />

              <input
                style={inputStyle}
                name="instagram"
                placeholder="Instagram @"
                onChange={handleChange}
                value={formData.instagram}
              />

              <select
                style={selectStyle}
                name="cnpj"
                onChange={handleChange}
                value={formData.cnpj}
              >
                <option value="">Possui CNPJ?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>

          {/* --- APARÊNCIA --- */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>✨ Aparência Física</h3>

            <div style={gridStyle}>
              <input style={inputStyle} name="altura" placeholder="Altura (cm)" onChange={handleChange} value={formData.altura} />
              <input style={inputStyle} name="peso" placeholder="Peso (kg)" onChange={handleChange} value={formData.peso} />
              <input style={inputStyle} name="olhos" placeholder="Cor dos Olhos" onChange={handleChange} value={formData.olhos} />
              <input style={inputStyle} name="cabelo" placeholder="Cor do Cabelo" onChange={handleChange} value={formData.cabelo} />
              <input style={inputStyle} name="pele" placeholder="Cor da Pele" onChange={handleChange} value={formData.pele} />
              <input style={inputStyle} name="tattoos" placeholder="Tatuagens / Piercings Visíveis" onChange={handleChange} value={formData.tattoos} />
            </div>

            <input
              style={{ ...inputStyle, marginTop: "16px" }}
              name="estilo"
              placeholder="Estilo / Visual"
              onChange={handleChange}
              value={formData.estilo}
            />

            <select
              style={{ ...selectStyle, marginTop: "16px" }}
              name="sensualNivel"
              onChange={handleChange}
              value={formData.sensualNivel}
            >
              <option value="">Nível de Conforto com Conteúdo Sensual (18+)</option>
              <option value="Baixo">Baixo</option>
              <option value="Médio">Médio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          {/* --- EXPERIÊNCIA --- */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>🎬 Experiência & Disponibilidade</h3>

            <textarea
              style={textareaStyle}
              name="experiencia"
              placeholder="Experiência anterior como modelo ou criador(a) de conteúdo..."
              onChange={handleChange}
              value={formData.experiencia}
            />

            <div style={gridStyle}>
              <select style={selectStyle} name="vinculo" onChange={handleChange} value={formData.vinculo}>
                <option value="">Vinculado(a) a outra agência?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>

              <select style={selectStyle} name="disponibilidade" onChange={handleChange} value={formData.disponibilidade}>
                <option value="">Disponível para ensaios?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>

            <input
              style={{ ...inputStyle, marginTop: "16px" }}
              name="horarios"
              placeholder="Horários disponíveis"
              onChange={handleChange}
              value={formData.horarios}
            />
          </div>

          {/* --- DIREITOS --- */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>📋 Direitos & Termos</h3>

            <div style={gridStyle}>
              <select style={selectStyle} name="autorizaImagem" onChange={handleChange} value={formData.autorizaImagem}>
                <option value="">Autoriza uso de imagem?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>

              <select style={selectStyle} name="diretrizes" onChange={handleChange} value={formData.diretrizes}>
                <option value="">Aceita as diretrizes?</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>

            <textarea
              style={{ ...textareaStyle, marginTop: "16px" }}
              name="restricoes"
              placeholder="Restrições pessoais ou limites de conteúdo..."
              onChange={handleChange}
              value={formData.restricoes}
            />
          </div>

          {/* --- FOTOS --- */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>📸 Fotos & Vídeo</h3>

            <div style={gridStyle}>
              <div>
                <label style={{ color: "white" }}>Foto de Rosto</label>
                <input style={inputStyle} type="file" name="photo1" accept="image/*" onChange={fileChange} />
              </div>

              <div>
                <label style={{ color: "white" }}>Foto Corpo Inteiro</label>
                <input style={inputStyle} type="file" name="photo2" accept="image/*" onChange={fileChange} />
              </div>

              <div>
                <label style={{ color: "white" }}>Foto Meio Corpo</label>
                <input style={inputStyle} type="file" name="photo3" accept="image/*" onChange={fileChange} />
              </div>

              <div>
                <label style={{ color: "white" }}>Vídeo (Opcional)</label>
                <input style={inputStyle} type="file" name="video" accept="video/*" onChange={fileChange} />
              </div>
            </div>
          </div>

          {/* --- MOTIVAÇÃO --- */}
          <div style={sectionStyle}>
            <h3 style={headingStyle}>💭 Informações Adicionais</h3>

            <textarea
              style={textareaStyle}
              name="motivo"
              placeholder="Por que deseja entrar para a VGD Agency?"
              onChange={handleChange}
              value={formData.motivo}
            />

            <textarea
              style={{ ...textareaStyle, marginTop: "16px" }}
              name="adicional"
              placeholder="Deseja acrescentar algo mais?"
              onChange={handleChange}
              value={formData.adicional}
            />

            <div style={gridStyle}>
              <input
                style={inputStyle}
                name="assinatura"
                placeholder="Assinatura (nome completo)"
                onChange={handleChange}
                value={formData.assinatura}
              />

              <input
                style={inputStyle}
                name="data"
                type="date"
                onChange={handleChange}
                value={formData.data}
              />
            </div>
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "16px",
              background: "black",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              marginTop: "16px",
            }}
          >
            Enviar Formulário
          </button>
        </div>
      </div>
    </div>
  );
}
