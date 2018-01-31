#!/usr/bin/perl

use strict;
use warnings;

use Encode qw(decode);

binmode STDOUT, ":utf8";

my $stdin = <STDIN>;
chomp $stdin;
my $folder_to_open = decode('UTF-8', $stdin);

my $output = '';

opendir (my $directory_handle, $folder_to_open) or die $!;

my $output_directory_name = 'converted-images';
my $output_directory_full_path = $folder_to_open.'/'.$output_directory_name;
unless (-e $output_directory_full_path or mkdir $output_directory_full_path) {
  die "Unable to create $output_directory_full_path<br>";
}

while (my $file = readdir ($directory_handle)) {
  # Only files are selected:
  next unless (-f "$folder_to_open/$file");
  # Regular expression is used to find files ending in .jpg:
  next unless ($file =~ m/\.jpg$/);

  my $filepath_to_read = $folder_to_open.'/'.$file;
  my $filepath_to_write = $output_directory_full_path.'/'.$file;

  $output = $output.'Resizing '.$file.' ...<br>';
  print $output;

  my $result = `convert $filepath_to_read -resize 20% $filepath_to_write`;
}

closedir ($directory_handle);

$output = $output.'Resizing successfully completed!<br>';
print $output;
