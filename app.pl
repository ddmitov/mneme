#!/usr/bin/env perl

# BEGIN {
#   $ENV{MOJO_MODE} = 'production';
# }

use strict;
use warnings;
use utf8;

# CORE MODULES:
use Encode qw(decode);
use File::Spec::Functions qw(catdir);

# CPAN MODULES:
use Mojolicious::Lite;

# APPLICATION FOLDER:
my $app_folder = catdir($ENV{PWD}, 'resources', 'app');

# CUSTOM PATHS
# Template path:
unshift @{app->renderer->paths}, $app_folder;
# Static files path:
unshift @{app->static->paths}, $app_folder;

# BASE ROUTE HANDLER
get '/' => sub {
  my $self = shift;
  $self->render('index');
};

# WEBSOCKET HANDLER:
websocket '/interactive_one' => sub {
  my $self = shift;

  # $self->send(decode('UTF-8', $data));

  # Handle websocket requests:
  $self->on(
    message => sub {
      my ($websocket, $websocket_request) = @_;

      # if ($websocket_request =~ '_select_') {
      #
      # }
    }
  );
};

# SERVER STARTER:
app->start;

__DATA__

@@ index.html.ep
% layout 'default';
% title 'Mneme';
Placeholder for Mneme - Mojolicious application for easy memorization of historical facts

@@ layouts/default.html.ep
<!DOCTYPE html>
<html>
  <head><title><%= title %></title></head>
  <body><%= content %></body>
</html>
