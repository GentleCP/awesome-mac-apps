#!/bin/bash
echo
echo "***************************************************"
echo "*                                                 *"
echo "*    This script will reindex your metadata by    *"
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

sudo mdutil -E -i on /

echo
echo "You can see the progress of the reindexing by performing a search in Spotlight"
echo
read -p "Press any key to finish..."
echo
