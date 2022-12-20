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


                step([$class: 'DockerBuilderPublisher', cleanImages: false, cleanupWithJenkinsJobDelete: false, cloud: '', dockerFileDirectory: '', fromRegistry: [], pushCredentialsId: '', pushOnSuccess: false, tagsString: 'TEST'])

                echo "building ... docker"

//                 sh "docker info "
//                 sh "docker version "
//                 sh "docker compose version "
            }


          }

      }

}
