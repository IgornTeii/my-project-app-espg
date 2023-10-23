import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModalExcluir.scss";

export default function ModalExcluir({ open, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      fetch(`http://localhost:5000/produtos/${id}`)
        .then(response => response.json())
        .then(data => setProduto(data))
        .catch(error => setError(error.message));
    }
  }, [id, open]);

  const handleExcluir = () => {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao excluir o produto");
      }
      console.log(response.status);
      alert("Produto Excluído com sucesso");
      onClose();
      navigate("/produtos");
    })
    .catch(error => setError(error.message));
  };

  if (!open) return null;

  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h2>Confirmação de Exclusão</h2>
        {error ? (
          <p className="error">{error}</p>
        ) : produto ? (
          <>
            <p className="subtitle">
              Deseja realmente excluir o produto: <span>{produto.nome}</span>?
            </p>
            <button onClick={handleExcluir}>Confirmar Exclusão</button>
            <button onClick={onClose}>Cancelar</button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
