#!/bin/bash
echo
echo "***************************************************"
echo "*                                                 *"
echo "*    This script will reindex your metadata by    *"
echo "*      firstly deleting .Spotlight-V100 then      *"
echo "*   running the command 'sudo mdutil -E -i on /'  *"
echo "*                                                 *"
echo "*         Indexing can take up to an hour         *"
echo "*     and Alfred won't work during this time.     *"
echo "*                                                 *"
echo "*   You can see the progress of the reindexing    *"
echo "*      by performing a search in Spotlight.       *"
echo "*                                                 *"
echo "***************************************************"
echo

read -p "Close this window to cancel, or press any key to continue..."

echo
echo "Attempting to delete .Spotlight-V100..."
echo

# attempt deleting the .Spotlight-V100 in the known locations
if [[ -d "/.Spotlight-V100" ]]; then
  sudo rm -R /.Spotlight-V100
elif [[ -d "/System/Volumes/Data/.Spotlight-V100" ]]; then
  sudo rm -R /System/Volumes/Data/.Spotlight-V100
else
  echo ".Spotlight-V100 folder not found"
fi

echo
echo "Requesting metadata reindex..."
echo

# start the reindex
sudo mdutil -E -i on /

echo
echo "You can see the progress of the reindexing by performing a search in Spotlight"
echo
read -p "Press any key to finish..."
echo
