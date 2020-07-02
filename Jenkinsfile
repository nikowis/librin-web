pipeline {
    agent any

    stages {
	
        stage('Remove deployment') {
            steps {
                sh 'cp -r /home/pi/librin/html/. /home/pi/librin/backups/html'
                sh 'rm -rf /home/pi/librin/html/*'
            }
        }
		
        stage('Build frontend') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                archiveArtifacts artifacts: '**/build/*', excludes:'**/node_modules/**/*/*/', fingerprint: true
            }
        }

        stage('Deploy frontend') {
            steps {
                sh 'cp -r ./build/. /home/pi/librin/html'
            }
        }
		
    }
}
