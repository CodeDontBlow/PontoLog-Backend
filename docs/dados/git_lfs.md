

# 📦 Como Configurar Git LFS (Large File Storage)

Este guia mostra como instalar e configurar o Git LFS para que você possa versionar arquivos grandes (como `.csv`, `.zip`, `.png`, etc.) sem sobrecarregar seu repositório Git.



## ✅ O que é o Git LFS?

Git LFS é uma extensão do Git que permite armazenar arquivos grandes fora do repositório principal, mantendo o Git rápido e leve.


## 🚀 Passo 1: Instalar o Git LFS

### 🔹 Windows
Baixe e instale: [https://git-lfs.com](https://git-lfs.com)

### 🔹 Ubuntu / Debian
```bash
sudo apt update
sudo apt install git-lfs
```


## 🔧 Passo 2: Inicializar o Git LFS no seu repositório
Dentro da pasta do projeto:
```bash
git lfs install
```

## Passo 3: Definir quais arquivos serão rastreados pelo LFS
Por exemplo, para arquivos .csv:
```bash
git lfs track "*.csv"
git lfs track "*.zip"
```

## ✅ Verificar arquivos rastreados pelo LFS
```bash
git lfs ls-files
```



| Feito com 💣 por CodeDon'tBlow
