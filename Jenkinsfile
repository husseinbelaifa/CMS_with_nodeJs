pipeline{

    agent any

     environment {
             branch = "${env.GIT_BRANCH.split("/")[1]}"

      }

      stages{

          stage("clone"){

              steps{

                git 'git@github.com:husseinbelaifa/CMS_with_nodeJs.git'
              }

          }

           stage("docker_v3"){


                   step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])


           }

          stage("docker_v2"){

              steps{

                step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])
              }


          }

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