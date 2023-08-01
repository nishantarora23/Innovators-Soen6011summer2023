mkdir artifact
xcopy web artifact\\web\\ /Y /E
xcopy resume artifact\\resume\\ /Y /E
xcopy configuration\\Database\\01-initial_users.sql artifact\\ /Y /E
xcopy build\\libs\\*.war artifact\\ /Y /E
"C:\\Program Files\\7-Zip\\7z" a -tzip artifacts.zip D:\\careerconnect\\artifact\\*
copy "docker-compose.yml" "artifact\\docker-compose.yml" /Y