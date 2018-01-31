#!/usr/bin/perl

use strict;
use warnings;

use AnyEvent;
use POSIX qw(strftime);
use Encode qw(decode);

binmode STDOUT, ":utf8";

my $input_text = "";

# Disable built-in buffering:
$| = 1;

# Set the event loop:
my $event_loop = AnyEvent->condvar;

my $wait_for_input = AnyEvent->io (
  fh => \*STDIN,
  poll => "r",
  cb => sub {
    my $stdin = <STDIN>;
    chomp $stdin;
    $input_text = decode('UTF-8', $stdin);

    message();

    # Close after close commmand is received:
    if ($stdin =~ "_close_") {
      print "_closed_";
      exit();
    }
  }
);

# Print local time every second:
my $wait_one_second = AnyEvent->timer (
  after => 0,
  interval => 1,
  cb => sub {
    message();
  },
);

$event_loop->recv;

sub message() {
  my $formatted_time = strftime('%H:%M:%S', localtime);
  if (length($input_text) > 0) {
    print "Local time: ".$formatted_time."<br>Last input: ".$input_text;
  } else {
    print "Local time: ".$formatted_time;
  }
}
