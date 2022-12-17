pipeline{

//     agent any

     agent {
        label 'docker'
      }

     environment {
             branch = "${env.GIT_BRANCH.split("/")[1]}"

      }

      stages{

          stage("clone"){

              steps{

                git 'git@github.com:husseinbelaifa/CMS_with_nodeJs.git'
              }

          }

          stage("verify_toolong"){


            steps{

                sh "docker info "
                sh "docker version "
                   sh "docker compose version "
            }


          }


//            stage('Test') {
//
//                       steps {
//
//                           sh 'docker rm -f $(docker ps -a -q)'
//                           sh 'docker-compose up --build --exit-code-from app'
//
//
//                       }
//           }


//           stage("docker_v2"){
//
//               steps{
//
//                 step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])
//               }
//
//
//           }

//           stage("docker_build"){
//
//
//               steps{
//
//                  sh 'docker '
//
//                  echo "docker compose build "
//               }
//
//           }

//           stage('docker run'){
//
//                 steps{
//
//                                sh 'docker-compose up'
//
//                                echo "docker compose run "
//                             }
//
//
//           }
      }

}