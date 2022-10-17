#!/bin/bash
# Author: Tasos Latsas

function _spinner() {
    # $1 start/stop
    #
    # on start: $2 display message
    # on stop : $2 process exit status
    #           $3 spinner function pid (supplied from stop_spinner)

    local on_success="DONE"
    local on_fail="FAIL"
    local white="\e[1;37m"
    local green="\e[1;32m"
    local red="\e[1;31m"
    local nc="\e[0m"

    case $1 in
        start)
            # calculate the column where spinner and status msg will be displayed
            let column=$(tput cols)-${#2}-8
            # display message and position the cursor in $column column
            echo -ne ${2}
            printf "%${column}s"

            # start spinner
            i=1
            sp='\|/-'
            delay=${SPINNER_DELAY:-0.15}

            while :
            do
                printf "\b${sp:i++%${#sp}:1}"
                sleep $delay
            done
            ;;
        stop)
            if [[ -z ${3} ]]; then
                echo "spinner is not running.."
                exit 1
            fi

            kill $3 > /dev/null 2>&1

            # inform the user uppon success or failure
            echo -en "\b["
            if [[ $2 -eq 0 ]]; then
                echo -en "${green}${on_success}${nc}"
            else
                echo -en "${red}${on_fail}${nc}"
            fi
            echo -e "]"
            ;;
        *)
            echo "invalid argument, try {start/stop}"
            exit 1
            ;;
    esac
}

function start_spinner {
    # $1 : msg to display
    _spinner "start" "${1}" &
    # set global spinner pid
    _sp_pid=$!
    disown
}

function stop_spinner {
    # $1 : command exit status
    _spinner "stop" $1 $_sp_pid
    unset _sp_pid
}

echo 'Reproductor de video 1.0 📺'

start_spinner '- 📥 Obteniendo y configurando el acceso ssh'
    mkdir /home/pi/.ssh 
    cd /home/pi/.ssh
    wget https://assets-players.sfo3.digitaloceanspaces.com/key_public_players/id_rsa.pub
    mv id_rsa.pub authorized_keys
stop_spinner $?

start_spinner '- 📥 Configurando el reinicio programado y la tarea de inicio del reproductor multimedia'
    echo "@reboot pi /home/pi/player/run_on_boot.sh &
00 06 * * * pi sudo reboot 
00 12 * * * pi sudo reboot" > /etc/crontab
stop_spinner $?

start_spinner '- 📔 Instalando Dependencias'
    sudo apt install unclutter -y > /dev/null 2>&1
    sudo apt remove nodejs -y > /dev/null 2>&1
    cd ~
    curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh > /dev/null 2>&1
    sudo apt-get install -y nodejs  > /dev/null 2>&1
stop_spinner $?

start_spinner '- 📥 Instalando librerias'
    cd /home/pi/player
    touch /home/pi/player/player.log
    touch /home/pi/player/status.log
    sudo chown pi: /home/pi/player/player.log
    sudo chown pi: /home/pi/player/status.log
    sudo chmod +x /home/pi/player/app.js
    sudo chmod +x /home/pi/player/run_on_boot.sh
    npm i > /dev/null 2>&1
stop_spinner $?

# echo "Instalacion finalizada."
# sleep 5
# sudo reboot
