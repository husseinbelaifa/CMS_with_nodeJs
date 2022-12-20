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

          stage('Build_docker_v1') {
              steps {
                  script{
                      app = docker.build("underwater")
                  }
              }
          }

          stage("building_docker_image_v2 sudo "){


            steps{


                sh "sudo docker --version"


//                step([$class: 'DockerBuilderPublisher', cleanImages: false, cleanupWithJenkinsJobDelete: false, cloud: '', dockerFileDirectory: '', fromRegistry: [], pushCredentialsId: '', pushOnSuccess: false, tagsString: 'TEST'])
//
//                echo "building ... docker"

//                 sh "docker info "
//                 sh "docker version "
//                 sh "docker compose version "
            }


          }

      }

}
