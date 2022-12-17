pipeline{

//     agent any

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

          stage("verify_toolong"){


            steps{

                step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartAllServices'], useCustomDockerComposeFile: true])

                echo "building ... docker"

//                 sh "docker info "
//                 sh "docker version "
//                 sh "docker compose version "
            }


          }

      }

}