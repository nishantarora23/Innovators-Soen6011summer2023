pipeline {
    agent {
		node {
		    label "master"
			customWorkspace "D://careerconnect"
		}
	}
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        skipDefaultCheckout()
    }

    stages {
        stage('Clone Repository') {
            steps {
                cleanWs()
                checkout scmGit(branches: [[name: '*/sprint-3']], extensions: [cleanBeforeCheckout(deleteUntrackedNestedRepositories: true), checkoutOption(3000)], userRemoteConfigs: [[url: 'https://github.com/nishantarora23/Innovators-Soen6011summer2023.git']])
            }
        }

        stage('Build and Test') {
            steps {
                bat 'gradle clean build'
            }
        }

        stage('Package') {
            steps {
                bat 'xcopy "configuration\\package.bat" "D://careerconnect" /Y'
                bat 'package.bat'
            }
        }
        
        stage('Integration Test') {
            steps {
                bat 'curl -o "artifact/mysql-connector-j-8.1.0.jar" -L "https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.1.0/mysql-connector-j-8.1.0.jar"'
                bat 'rename D:\\careerconnect\\artifact\\careerconnect-1.0-SNAPSHOT.war careerconnect.war'
                bat 'docker-compose -f artifact\\docker-compose.yml up -d'
                bat 'ping 127.0.0.1 -n 40  1>nul'
                bat 'gradle integrationTest'
                bat 'docker-compose -f artifact\\docker-compose.yml down'
                bat 'echo y | docker system prune -a'
                
            }
        }
    }
    post {
        always {
             bat 'mkdir unit_int_test_report'
             bat 'xcopy build\\reports\\* unit_int_test_report\\ /Y /E'
             bat '"C:\\Program Files\\7-Zip\\7z" a -tzip unit_int_test_report.zip unit_int_test_report\\*'
             emailext body: '''${SCRIPT, template="groovy-html.template"}''',
             mimeType: 'text/html',
             subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME}: #${env.BUILD_NUMBER}",
             to: "aroranish23@gmail.com",
             attachmentsPattern: '**/unit_int_test_report.zip'
        }
    }
}