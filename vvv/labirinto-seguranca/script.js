let score = 0;
let currentScene = 0;
const totalScenes = 9;

const decisions = {
    1: {
        A: {
            text: "Excelente! Você identificou vulnerabilidades críticas e ganhou um 'escudo de prevenção'.",
            points: 2,
            type: "positive"
        },
        B: {
            text: "Vazamento de dados! Você ignorou riscos conhecidos e expôs informações sensíveis.",
            points: -1,
            type: "negative"
        }
    },
    2: {
        A: {
            text: "Credenciais expostas! Um funcionário com acesso irrestrito sofreu um ataque de phishing, comprometendo contas administrativas.",
            points: -1,
            type: "negative"
        },
        B: {
            text: "Bom trabalho! O controle de acesso baseado no princípio do menor privilégio reduziu significativamente o risco interno.",
            points: 2,
            type: "positive"
        }
    },
    3: {
        A: {
            text: "Penalidade aplicada! A falta de conformidade com normas resultou em multa e perda de clientes devido ao vazamento de dados.",
            points: -3,
            type: "negative"
        },
        B: {
            text: "Parabéns! Você reforçou a governança de segurança e ganhou um 'selo de conformidade', aumentando a confiança dos clientes.",
            points: 2,
            type: "positive"
        }
    },
    4: {
        A: {
            text: "Alerta detectado e ataque bloqueado! O firewall e IDS impediram a invasão, protegendo a infraestrutura.",
            points: 2,
            type: "positive"

        },
        B: {
            text: "Invasão total! O hacker explorou a porta 22 aberta e assumiu o controle dos servidores.",
            points: -3,
            type: "negative"
        }
    },
    5: {
        A: {
            text: "Ransomware ativado! O anexo malicioso criptografou todos os servidores, paralisando as operações.",
            points: -3,
            type: "negative"
        },
        B: {
            text: "A equipe identificou o golpe! O e-mail de phishing foi reportado e evitou-se um ataque catastrófico.",
            points: 2,
            type: "positive"
        }
    },
    6: {
        A: {
            text: "Site protegido com sucesso! O WAF e as validações implementadas bloquearam tentativas de exploração.",
            points: 2,
            type: "positive"
        },
        B: {
            text: "Ataque SQL Injection bem-sucedido! Os dados do banco foram roubados e publicados na dark web.",
            points: -3,
            type: "negative"
        }
    },
    7: {
        A: {
            text: "Dados seguros! Mesmo com acesso ao banco, o atacante não conseguiu ler as informações criptografadas.",
            points: 2,
            type: "positive"
        },
        B: {
            text: "Dados vazados! Um atacante acessou o banco não criptografado, resultando em multa da LGPD.",
            points: -3,
            type: "negative"
        }
    },
    8: {
        A: {
            text: "O ataque escalou! A demora na resposta permitiu que o invasor assumisse o controle total, paralisando os serviços.",
            points: -3,
            type: "negative"
        },
        B: {
            text: "Incidente controlado! O plano de resposta foi acionado rapidamente, contendo a ameaça e restaurando o ambiente.",
            points: 2,
            type: "positive"
        }
    }
};

function initFloatingIcons() {
    const icons = ['fa-shield-alt', 'fa-lock', 'fa-key', 'fa-user-secret', 'fa-bug', 'fa-globe', 'fa-network-wired', 'fa-file-contract'];
    const container = document.querySelector('.floating-icons');

    for (let i = 0; i < 20; i++) {
        const icon = document.createElement('i');
        icon.className = `floating-icon fas ${icons[Math.floor(Math.random() * icons.length)]}`;
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animationDuration = `${15 + Math.random() * 20}s`;
        container.appendChild(icon);
    }
}

function initBinaryRain() {
    const container = document.querySelector('.binary-rain');
    if (!container) return;

    setInterval(() => {
        const binaryDigit = document.createElement('div');
        binaryDigit.className = 'binary-digit';
        binaryDigit.textContent = Math.random() > 0.5 ? '1' : '0';
        binaryDigit.style.left = `${Math.random() * 100}%`;
        binaryDigit.style.animationDuration = `${3 + Math.random() * 5}s`;
        container.appendChild(binaryDigit);

        setTimeout(() => {
            binaryDigit.remove();
        }, 8000);
    }, 100);
}

function nextScene(sceneNumber) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    document.getElementById(`scene${sceneNumber}`).classList.add('active');
    currentScene = sceneNumber;

    const progressPercentage = (sceneNumber / totalScenes) * 100;
    document.getElementById('progress').style.width = `${progressPercentage}%`;

    if (sceneNumber > 0 && sceneNumber < 9) {
        document.getElementById('stage-indicator').textContent = `Etapa ${sceneNumber} de 8`;
    }

    updateStatus();

    const situation = document.querySelector('.situation');
    if (situation) {
        situation.classList.remove('active');
        void situation.offsetWidth;
        situation.classList.add('active');
    }
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    if (score >= 10) {
        statusElement.textContent = "Ótimo";
        statusElement.style.color = "var(--accent)";
    } else if (score >= 5) {
        statusElement.textContent = "Bom";
        statusElement.style.color = "var(--warning)";
    } else if (score >= 0) {
        statusElement.textContent = "Regular";
        statusElement.style.color = "var(--primary)";
    } else {
        statusElement.textContent = "Crítico";
        statusElement.style.color = "var(--danger)";
    }
}

function selectOption(sceneNumber, option) {
    const decision = decisions[sceneNumber][option];

    score += decision.points;
    document.getElementById('score').textContent = score;
    updateStatus();

    const resultDiv = document.createElement('div');
    resultDiv.className = `result ${decision.type}`;
    resultDiv.innerHTML = `<h3>Resultado da Decisão</h3><p>${decision.text}</p><p>Pontos: ${decision.points > 0 ? '+' : ''}${decision.points}</p>`;

    const currentSceneElement = document.getElementById(`scene${sceneNumber}`);

    const conceptElement = currentSceneElement.querySelector('.concept');
    currentSceneElement.insertBefore(resultDiv, conceptElement.nextSibling);

    const options = currentSceneElement.querySelectorAll('.option');
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        opt.style.opacity = '0.6';
    });

    const existingContinueBtn = currentSceneElement.querySelector('.continue-btn');
    if (existingContinueBtn) {
        existingContinueBtn.remove();
    }

    const continueButton = document.createElement('button');
    continueButton.className = 'btn continue-btn';
    continueButton.innerHTML = 'Continuar <i class="fas fa-arrow-right"></i>';
    continueButton.onclick = function () {
        if (sceneNumber < 8) {
            nextScene(sceneNumber + 1);
        } else {
            showFinalResult();
        }
    };

    currentSceneElement.appendChild(continueButton);
}

function showFinalResult() {
    nextScene(9);

    const finalResult = document.getElementById('final-result');
    const resultDescription = document.getElementById('result-description');

    let resultText = '';
    let resultClass = '';
    let description = '';

    if (score >= 12) {
        resultText = 'Empresa Protegida!';
        resultClass = 'excellent';
        description = 'Parabéns! A TechNova está segura graças às suas decisões estratégicas. Você demonstrou excelente conhecimento em segurança cibernética.';
    } else if (score >= 8) {
        resultText = 'Analista em Formação';
        resultClass = 'good';
        description = 'Bom trabalho! A TechNova enfrentou alguns problemas, mas no geral está protegida. Continue aprendendo para melhorar suas habilidades.';
    } else {
        resultText = 'Empresa Comprometida';
        resultClass = 'bad';
        description = 'A TechNova sofreu sérios prejuízos devido às más decisões de segurança. É necessário revisar os conceitos fundamentais de segurança cibernética.';
    }

    finalResult.innerHTML = `
        <div class="final-score ${resultClass}">${score} pontos</div>
        <h3>${resultText}</h3>
    `;

    resultDescription.textContent = description;
}

function restartGame() {
    score = 0;
    currentScene = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('progress').style.width = '0%';
    document.getElementById('stage-indicator').textContent = 'Etapa 1 de 8';
    updateStatus();

    document.querySelectorAll('.result').forEach(result => {
        result.remove();
    });

    document.querySelectorAll('.continue-btn').forEach(btn => {
        btn.remove();
    });

    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'auto';
        opt.style.opacity = '1';
    });

    nextScene(0);
}

window.onload = function () {
    initFloatingIcons();
    initBinaryRain();
    updateStatus();
};