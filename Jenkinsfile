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
      }

}