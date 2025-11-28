pipeline {
    agent any
    
    environment {
        // Define el nombre del scanner tool configurado en Jenkins
        SCANNER_HOME = tool 'SonarScanner' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instalar dependencias backend
                dir('backend') {
                    sh 'npm install'
                }
                // Instalar dependencias frontend
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test & Coverage') {
            steps {
                dir('backend') {
                    // Genera reporte de cobertura para Sonar
                    sh 'npm test' 
                }
                // Si tienes tests en frontend, agrégalos aquí
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // Nombre de tu servidor en Jenkins
                    // Analizar Backend
                    dir('backend') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner"
                    }
                    // Analizar Frontend (Opcional si quieres separar proyectos)
                    // dir('frontend') { sh "${SCANNER_HOME}/bin/sonar-scanner" }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    // Esto detiene el pipeline si falla el Quality Gate (Requisito punto G)
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t weather-backend:latest ./backend'
                    sh 'docker build -t weather-frontend:latest ./frontend'
                }
            }
        }

        stage('Deploy Dev') {
            when {
                branch 'dev'
            }
            steps {
                sh 'echo "Desplegando en puerto 3001 (Dev)..."'
                sh 'docker run -d -p 3001:3001 weather-backend'
            }
        }

        stage('Deploy Prod') {
            when {
                branch 'main'
            }
            steps {
                sh 'echo "Desplegando en puerto 8080 (Prod)..."'
                sh 'docker run -d -p 8080:3001 weather-backend'
            }
        }
    }
}