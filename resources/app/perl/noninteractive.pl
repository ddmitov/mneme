#!/usr/bin/perl

use strict;
use warnings;

use Encode qw(decode);

binmode STDOUT, ":utf8";

my $stdin = <STDIN>;
chomp $stdin;
my $input_text = decode('UTF-8', $stdin);

print "$input_text";
