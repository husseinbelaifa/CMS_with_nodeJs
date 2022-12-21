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


          stage("building_docker_image_v5_sudo "){


            steps{

//                sh "docker --version"

                script {
                    myImage = docker.build("test_hussein") // build the Dockerfile
                }

            }


          }

      }

}
