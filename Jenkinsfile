pipeline {
    agent any
    
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
                bat 'mkdir artifact'
                bat 'xcopy web artifact\\web\\ /Y /E'
                bat 'xcopy resume artifact\\resume\\ /Y /E'
                bat 'xcopy build\\libs\\*.war artifact\\ /Y /E'
                bat '"C:\\Program Files\\7-Zip\\7z" a -tzip artifacts.zip artifact\\*'
                bat 'mkdir unit_test_report'
                bat 'xcopy build\\reports\\tests\\test\\* unit_test_report\\ /Y /E'
                bat '"C:\\Program Files\\7-Zip\\7z" a -tzip unit_test_report.zip unit_test_report\\*'
            }
        }
    }
    post {
        always {
             emailext body: '''${SCRIPT, template="groovy-html.template"}''',
             mimeType: 'text/html',
             subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME}: #${env.BUILD_NUMBER}",
             to: "aroranish23@gmail.com, merlinmary08@gmail.com, karran1697@gmail.com, gaganpandher04@gmail.com, kaurnav4199@gmail.com, navjotkamboj0206@gmail.com",
             attachmentsPattern: '**/unit_test_report.zip'
        }
    }
}