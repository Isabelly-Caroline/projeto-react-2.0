import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { FileCheck, Mail, Lock, User, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { Button, Alert, Badge } from '../ui/UIComponents';

export const FormsConcept = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    experience: 'Pleno',
    agreeTerms: false
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'O nome completo é obrigatório.';
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Insira um e-mail válido com @ e domínio.';
    }
    if (formData.password.length < 6) {
      errs.password = 'A senha precisa ter pelo menos 6 caracteres.';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'Você deve aceitar os termos para prosseguir.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedData(null);
    } else {
      setErrors({});
      setSubmittedData(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      experience: 'Pleno',
      agreeTerms: false
    });
    setErrors({});
    setSubmittedData(null);
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (p.length === 0) return { label: 'Vazia', color: 'bg-slate-700' };
    if (p.length < 6) return { label: 'Fraca', color: 'bg-rose-500' };
    if (p.length < 10) return { label: 'Média', color: 'bg-amber-500' };
    return { label: 'Forte', color: 'bg-emerald-500' };
  };

  const codeExample = `// Formulário Controlado no React com Validação Síncrona
function RegistrationForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede recarga da página
    console.log('Dados submetidos:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name} // Estado único de verdade
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <FileCheck className="text-amber-500" size={22} />
          08. Formulários - Componentes Controlados
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Em formulários React controlados, cada campo de formulário se vincula a uma variável de estado. O React intercepta o evento <code>onChange</code> para atualizar a fonte de verdade antes que a UI seja re-renderizada.
        </p>

        {/* Live Form Playground */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-semibold text-amber-400 text-sm flex items-center gap-2">
                <User size={16} /> Cadastro de Desenvolvedor
              </h4>

              {/* Full Name */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nome Completo *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Ex: Isabelly Pardim"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full bg-slate-900 border ${errors.fullName ? 'border-rose-500' : 'border-slate-700'} rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">E-mail Corporativo *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="dev@empresa.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-slate-900 border ${errors.email ? 'border-rose-500' : 'border-slate-700'} rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500`}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">Senha de Acesso *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-slate-900 border ${errors.password ? 'border-rose-500' : 'border-slate-700'} rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500`}
                  />
                </div>
                {/* Password Strength Indicator */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getPasswordStrength().color} transition-all duration-300`} style={{ width: `${Math.min(100, formData.password.length * 10)}%` }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Força: {getPasswordStrength().label}</span>
                </div>
                {errors.password && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.password}</p>}
              </div>

              {/* Select Experience */}
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nível de Experiência</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-500"
                >
                  <option value="Júnior">Júnior (0-2 anos)</option>
                  <option value="Pleno">Pleno (2-5 anos)</option>
                  <option value="Sênior">Sênior (5+ anos)</option>
                  <option value="Tech Lead">Tech Lead / Arquiteto</option>
                </select>
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                  />
                  Li e aceito os termos de código e boas práticas
                </label>
                {errors.agreeTerms && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.agreeTerms}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="gradient" size="md" className="flex-1">
                  Validar e Submeter
                </Button>
                <Button type="button" onClick={handleReset} variant="secondary" size="md" icon={RefreshCw}>
                  Limpar
                </Button>
              </div>
            </form>

            {/* State Inspector & Submission Preview */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-300 text-sm">Inspector de Estado do Form em Tempo Real:</h4>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p className="text-slate-500 mb-2">// formData state snapshot:</p>
                <pre className="text-amber-400">{JSON.stringify(formData, null, 2)}</pre>
              </div>

              {submittedData && (
                <Alert type="success" title="Formulário Processado com Sucesso!">
                  <div className="space-y-1 text-xs mt-2 font-mono">
                    <p>✓ Nome: {submittedData.fullName}</p>
                    <p>✓ Email: {submittedData.email}</p>
                    <p>✓ Nível: {submittedData.experience}</p>
                    <p>✓ Status: Aceitou os Termos</p>
                  </div>
                </Alert>
              )}
            </div>
          </div>
        </div>

        <CodeBlock code={codeExample} title="ControlledForm.jsx" />
      </div>
    </div>
  );
};
